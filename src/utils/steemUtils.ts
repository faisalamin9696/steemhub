import { isNumber } from 'lodash';

export const isCommunity = (username: string) => {
    if (/hive-[1-3]\d{4,6}$/.test(username) && isNumber(Number(username.split('-')[1]))) {
        return true;
    }

    return false;
};
