import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { delay, mapSds, validateSds } from './utils';
import { Timestamp } from 'firebase-admin/firestore';

type FirebaseNotificationSettings = {
    status: boolean;
    vote: {
        status: boolean,
        minRep: number,
        minSp: number,
        minVote: number
    },
    reply: {
        status: boolean,
        minRep: number,
        minSp: number,
    },
    follow: {
        status: boolean,
        minRep: number,
        minSp: number,
    },
    mention: {
        status: boolean,
        minRep: number,
        minSp: number,
    },
    resteem: {
        status: boolean,
        minRep: number,
        minSp: number,
    },
}
type UserProps = {
    name: string;
    snippets: string[];
    timestamp: number;
    fcmToken: string;
    lastRead: Timestamp;
    notification: FirebaseNotificationSettings
}

type Notification = {
    "id": number,
    "time": number,
    "type": string,
    "is_read": number,
    "is_update": number,
    "link_depth": number,
    "account": string,
    "author": string,
    "permlink": string,
    "voted_rshares": number,
}

const DEFAULT_NOTIFICATION_SETTINGS = {
    status: true,
    vote: {
        status: true,
        minRep: 25,
        minSp: 15,
        minVote: 0.001
    },
    reply: {
        status: true,
        minRep: 25,
        minSp: 15,
    },
    follow: {
        status: true,
        minRep: 25,
        minSp: 0,
    },
    mention: {
        status: true,
        minRep: 25,
        minSp: 15,
    },
    resteem: {
        status: true,
        minRep: 25,
        minSp: 15,
    },
}
const generateNotificationBody = (type: string, payload: Notification): string => {
    let message = `New notification from ${payload.account}`;
    switch (type) {
        case 'resteem':
            message = `${payload.account} resteemed your post`;
            break;
        case 'follow':
            message = `${payload.account} followed you`;
            break;
        case 'reply':
            if (payload.link_depth === 1)
                message = `${payload.account} replied to your post`;
            else
                message = `${payload.account} replied to your comment`;
            break;
        case 'mention':
            message = `${payload.account} mentioned you`;
            break;
        case 'vote':
            message = `${payload.account} voted on your post`;
            break;
        default:
            return message;

    }

    return message;
}
admin.initializeApp();
var db = admin.firestore();
const sds_base = 'https://sds0.steemworld.org'


const getAllUsers = async () => {


    try {
        const usersSnapshot = await db.collection('Users').get();
        const users: UserProps[] = [];
        usersSnapshot.forEach((userDoc) => {
            if (userDoc.data())
                users.push(userDoc.data() as UserProps);
        });

        return users;


    } catch (error) {
        console.error('Error fetching users:', error);
        return []
    }
}
const getUnreadCount = async (username: string, settings: FirebaseNotificationSettings): Promise<number> => {
    const filter = `{${settings.mention.status ? `"mention":{"minSP":${settings.mention.minSp},"minReputation":${settings.mention.minRep}},` : ''}
    ${settings.vote.status ? `"vote":{"minVoteAmount":${settings.vote.minVote},"minReputation":${settings.vote.minRep},
    "minSP":${settings.vote.minSp}},` : ''}
    ${settings.follow.status ? `"follow":{"minSP":${settings.follow.minSp},"minReputation":${settings.follow.minRep}},` : ''}
     ${settings.resteem.status ? `"resteem":{"minSP":${settings.resteem.minSp},"minReputation":${settings.resteem.minRep}},` : ''}
     ${settings.reply.status ? `"reply":{"minSP":${settings.reply.minSp},"minReputation":${settings.reply.minRep}}` : ''}}`

    try {
        const response = await fetch(sds_base + `/notifications_api/getFilteredUnreadCount/${username}/${filter}`);
        if (response.ok) {
            const result = await response.json();
            if (validateSds(result)) {
                return result?.result;
            } else return 0
        }
        else return 0;

    } catch (error) {
        console.error('Error fetching unread:', error);
        return 0
    }
}

const getUnreadNotifications = async (username: string, settings: FirebaseNotificationSettings): Promise<Notification[]> => {

    const filter = `{"mention":{"exclude":${!settings.mention.status}, "minSP":${settings.mention.minSp},"minReputation":${settings.mention.minRep}},
   "vote":{"exclude":${!settings.vote.status}, "minVoteAmount":${settings.vote.minVote},"minReputation":${settings.vote.minRep},"minSP":${settings.vote.minSp}},
   "follow":{"exclude":${!settings.follow.status}, "minSP":${settings.follow.minSp},"minReputation":${settings.follow.minRep}},
   "resteem":{"exclude":${!settings.resteem.status}, "minSP":${settings.resteem.minSp},"minReputation":${settings.resteem.minRep}},
  "reply":{"exclude":${!settings.reply.status}, "minSP":${settings.reply.minSp},"minReputation":${settings.reply.minRep}}}`


    try {
        const response = await fetch(sds_base + `/notifications_api/getFilteredNotificationsByStatus/${username}/new/${filter}`);
        if (response.ok) {
            const result = await response.json();
            if (validateSds(result)) {
                return mapSds(result) as Notification[];
            } else return []
        }
        else return [];

    } catch (error) {
        console.error('Error fetching unread:', error);
        return []
    }
}


async function processNotifications(notifications: Notification[], user: UserProps) {
    for (const notification of notifications) {
        if (user.lastRead && (notification.time * 1000 < user.lastRead.toMillis())) {
            break;
        } else {
            const payload = {
                token: user.fcmToken,
                data: {
                    author: notification.author,
                    account: notification.account,
                    permlink: notification.permlink,
                    time: notification.time.toString(),
                    type: notification.type
                },
                notification: {
                    body: generateNotificationBody(notification.type, notification),
                },
            };

            try {
                // Send notification asynchronously
                await admin.messaging().send(payload);
            } catch (error) {
                console.error('Error sending notification:', error);
            }
        }
    }

    try {
        // Update the lastRead timestamp after processing notifications
        await db.collection('Users').doc(user.name).set({
            lastRead: Timestamp.now()
        }, { merge: true });
        console.log('Notifications sent and lastRead timestamp updated.');
    } catch (error) {
        console.error('Error updating lastRead timestamp:', error);
    }
}


const streamNotifications = functions.pubsub.schedule('*/5 * * * *').onRun(async (context) => {
    const all_users = await getAllUsers();
    if (all_users) {
        all_users.forEach(async (user) => {

            const notiSettings = user?.notification ?? DEFAULT_NOTIFICATION_SETTINGS;
            if (user.fcmToken) {
                if (notiSettings.status) {  // validate the fcm token
                    const validity = await admin.messaging().send({ token: user.fcmToken }, true);

                    if (validity) {

                        // get unread notification count
                        const unread = await getUnreadCount(user.name, notiSettings);


                        if (unread) {
                            const notifications = await getUnreadNotifications(user.name, notiSettings);
                            await processNotifications(notifications, user);
                        }


                        // delay request = 1 second
                        await delay(1000);

                    }
                }

            }

        });

    }
});

export { streamNotifications }

