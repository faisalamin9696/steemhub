import { Client, Discussion, DisqussionQuery } from "@hiveio/dhive";
import { AppStrings } from "../constants/AppStrings";

export let client = new Client(AppStrings.rpc_servers[0], {
    timeout: AppStrings.chain_timeout,
    addressPrefix: AppStrings.chain_prefix,
    chainId: AppStrings.chain_id,
    failoverThreshold: 10,
    consoleOnFailover: true,
});

export const getDiscussionBy = async (account: string, observer?: string,
    start_author?: string,
    start_permlink?: string): Promise<Discussion[]> => {

    const query = {
        account: account, limit: 10, observer: observer ?? 'null', start_author, start_permlink
    }
    return new Promise((resolve, reject) => {
        client.hivemind.getAccountPosts({ ...query, sort: 'posts', }).then((result) => {
            if (result) {
                resolve(result);
                
            } else {
                reject(null);
            }
        }).catch((err) => {
            reject(err);
        });
    });
};