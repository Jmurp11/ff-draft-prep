import {v4} from 'uuid'; 
import { redis } from '../redis';
import { baseUrl, confirmationPrefix } from '../constants/constants';

export const createConfirmationUrl = async (userId: string): Promise<string> => {
    const token = v4();

    await redis.set(`${confirmationPrefix}${token}`, userId, "ex", 60*60*24) // 1 day expiration

    return `${baseUrl}/auth/confirm/${token}`;
}