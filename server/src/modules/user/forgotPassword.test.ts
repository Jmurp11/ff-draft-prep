import { createTypeormConn, TestClient, forgotPasswordLockAccount, createForgotPasswordLink } from "../../utils";
import { User } from "../../entity/index";
import { Connection } from "typeorm";
import { user as userData } from '../../constants/test-constants';
import * as Redis from 'ioredis';
import { forgotPasswordLockError, passwordNotLongEnough, expiredRedisKeyError } from './errorMessages'


const redis = new Redis();
let conn: Connection;
const email = "bob5@bob.com";
const password = "jlkajoioiqwe";
const username = userData.username;
let userId: string;
beforeAll(async () => {
    conn = await createTypeormConn();
    const user = await User.create({
        email,
        password,
        username,
        confirmed: true
    }).save();
    userId = user.id;
});

afterAll(async () => {
    conn.close();
});

describe("forgot password", () => {
    it('validate forgot password works', async () => {
        const newPassword = 'newPassword';

        const client = new TestClient(process.env.TEST_HOST as string);

        await forgotPasswordLockAccount(userId, redis);

        const url = await createForgotPasswordLink("", userId, redis);
        const parts = url.split('/');
        const key = parts[parts.length - 1];

        expect(await client.login(email, newPassword)).toEqual({
            data: {
                login: [{
                    path: 'email',
                    message: forgotPasswordLockError
                }]
            }
        });

        const tooShortResponse = await client.forgotPasswordChange('a', key);

        expect(tooShortResponse.data).toEqual({
            forgotPasswordChange: [{
                path: 'newPassword',
                message: passwordNotLongEnough
            }]
        });

        const correctResponse = await client.forgotPasswordChange(newPassword, key);

        expect(correctResponse.data).toEqual({
            forgotPasswordChange: null
        });

        const redisKeyExpiredResponse = await client.forgotPasswordChange('abcdefgh1234', key);

        expect(redisKeyExpiredResponse.data).toEqual({
            forgotPasswordChange: [{
                path: 'key',
                message: expiredRedisKeyError
            }]
        });

        const validLogin = await client.login(email, newPassword);
        expect(validLogin.data).toEqual({
            login: null
        });
    });
});