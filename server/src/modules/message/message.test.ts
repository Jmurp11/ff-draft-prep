import { User, Message, Thread } from '../../entity/index';
import {
    user as userData,
    messageData,
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
let messageId: string;

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

    const message = await Message.create({
        author: userId,
        thread: threadId,
        dateCreated: '01/02/2020',
        body: 'test body'
    }).save();
    messageId = message.id;
});

afterEach(async () => {
    conn.close();
});

describe("message mutations", () => {
    it('create message', async () => {
        const client = new TestClient(process.env.TEST_HOST as string);

        const response = await client.createMessage(userId2, threadId, messageData.dateCreated, messageData.body);

        expect(response.data).toEqual({ createMessage: null });
    });

    it('delete message', async () => {
        const client = new TestClient(process.env.TEST_HOST as string);

        const response = await client.deleteMessage(messageId);

        expect(response.data).toEqual({ deleteMessage: null });
        expect(await Message.find()).toHaveLength(0);
    });
});

describe("message queries", () => {
    it('return message by id', async () => {
        const client = new TestClient(process.env.TEST_HOST as string);

        const response = await client.message(messageId);

        expect(response.data.message.id).toEqual(messageId);
        expect(response.data.message.author.id).toEqual(userId);
    });

    it('return all messages', async () => {
        const client = new TestClient(process.env.TEST_HOST as string);

        const response = await client.messages(threadId);

        expect(response.data.messages[0].id).toEqual(messageId);
        expect(response.data.messages).toHaveLength(1);
    });

    it('return all messages by user', async () => {
        const client = new TestClient(process.env.TEST_HOST as string);

        await Message.create({
            author: userId2,
            thread: threadId,
            dateCreated: messageData.dateCreated,
            body: messageData.body
        }).save();

        const response = await client.messagesByUser(userId2);

        expect(response.data.messagesByUser[0].author.id).toEqual(userId2);
        expect(response.data.messagesByUser[0].author.username).toEqual('anotherTest');
        expect(response.data.messagesByUser[0].thread.title).toEqual(threadData.title);
        expect(response.data.messagesByUser).toHaveLength(1);
    });
});
