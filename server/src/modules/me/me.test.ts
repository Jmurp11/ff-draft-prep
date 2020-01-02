import { Connection } from 'typeorm';
import { createTypeormConn, TestClient } from '../../utils';
import { User } from '../../entity/index';
import {
    user as userData
} from '../../constants/test-constants';

let userId: string;
let conn: Connection;
const email = userData.email;
const password = userData.password;
const username = userData.username;

beforeEach(async () => {
    conn = await createTypeormConn();
    const user = await User.create({
        email,
        password,
        username,
        confirmed: true
    }).save();
    userId = user.id;
});

afterEach(async () => {
    conn.close();
});

describe('me', () => {
    it("return null if no cookie", async () => {
        const client = new TestClient(process.env.TEST_HOST as string);
        const response = await client.me();
        expect(response.data.me).toBeNull();
    });

    it("get current user", async () => {
        const client = new TestClient(process.env.TEST_HOST as string);
        await client.login(email, password);
        const response = await client.me();

        expect(response.data).toEqual({
            me: {
                id: userId,
                email
            }
        });
    });
});