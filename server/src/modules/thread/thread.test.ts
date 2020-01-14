import { User, Thread, Note } from '../../entity/index';
import {
    user as userData,
    threadData
} from '../../constants/test-constants';
import { createTypeormConn, TestClient } from '../../utils';
import { Connection } from 'typeorm';

let conn: Connection;
const email = "bob5@bob.com";
const password = "jlkajoioiqwe";
let userId: string;
let userId2: string;
let threadId: string;

beforeEach(async () => {
    conn = await createTypeormConn();
    const user = await User.create({
        email,
        password,
        username: userData.username,
        confirmed: true
    }).save();
    userId = user.id;

    const user2 = await User.create({
        email: 'test@draftshark.io',
        password,
        username: 'anotherTest',
        confirmed: true
    }).save();
    userId2 = user2.id;

    const thread = await Thread.create({
        creator: userId,
        dateCreated: '01/02/2020',
        title: 'test'
    }).save();
    threadId = thread.id;
});

afterEach(async () => {
    conn.close();
});

describe("thread mutations", () => {
    it('create thread', async () => {
        const client = new TestClient(process.env.TEST_HOST as string);

        const response = await client.createThread(userId, threadData.dateCreated, 'new title');

        expect(response.data).toEqual({ createThread: null });

    });

    it('delete thread', async () => {
        const client = new TestClient(process.env.TEST_HOST as string);

        const response = await client.deleteThread(threadId);

        expect(response.data).toEqual({ deleteThread: null });
        expect(await Note.find()).toHaveLength(0);
    });
});

describe("thread queries", () => {
    it('return thread by id', async () => {
        const client = new TestClient(process.env.TEST_HOST as string);

        const response = await client.thread(threadId);

        expect(response.data.thread.id).toEqual(threadId);
        expect(response.data.thread.creator.id).toEqual(userId);
    });

    it('return all threads', async () => {
        const client = new TestClient(process.env.TEST_HOST as string);

        const response = await client.threads();

        expect(response.data.threads[0].id).toEqual(threadId);
        expect(response.data.threads).toHaveLength(1);
    });

    it('return all threads by user', async () => {
        const client = new TestClient(process.env.TEST_HOST as string);

        await Thread.create({
            creator: userId2,
            title: threadData.title,
            dateCreated: threadData.dateCreated
        }).save();

        const response = await client.threadsByUser(userId2);

        expect(response.data.threadsByUser[0].creator.id).toEqual(userId2);
        expect(response.data.threadsByUser[0].creator.username).toEqual('anotherTest');
        expect(response.data.threadsByUser).toHaveLength(1);
    });
});