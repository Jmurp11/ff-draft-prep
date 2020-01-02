import { v4 as uuid } from 'uuid';
import { Redis } from 'ioredis';
import { forgotPasswordPrefix } from '../constants/constants';

export const createForgotPasswordLink = async (
    url: string,
    userId: string | null,
    redis: Redis
) => {
    const id = uuid();
    await redis.set(`${forgotPasswordPrefix}${id}`, userId, "ex", 60 * 20);
    return `${url}/change-password/${id}`;
};