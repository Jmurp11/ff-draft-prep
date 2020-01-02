import * as Redis from 'ioredis';
import fetch from 'node-fetch';
import { createConfirmEmailLink } from './createConfirmEmailLink';
import { createTypeormConn } from './createTypeOrmConn';
import { User } from '../entity/index';
import { user as userData } from '../constants/test-constants';
import { Connection } from 'typeorm';

let userId = "";
const redis = new Redis();

let conn: Connection;

beforeEach(async () => {
    conn = await createTypeormConn();
    const user = await User.create({
        email: userData.email,
        password: userData.password,
        username: userData.username
    }).save()
    userId = user.id;
});

afterEach(async () => {
    conn.close();
});

test('createConfirmEmailLink confirms user and clears key in redis', async () => {
    const url = await createConfirmEmailLink(
        process.env.TEST_HOST as string,
        userId,
        redis
    );

    const response = await fetch(url);
    const text = await response.text();

    expect(text).toEqual('ok');

    const user = await User.findOne({ where: { id: userId } });

    expect((user as User).confirmed).toBeTruthy();

    const chunks = url.split('/');
    const key = chunks[chunks.length - 1];
    const urlIdValue = await redis.get(key);

    expect(urlIdValue).toBeNull();
});