import { User, Player, Team, Note, Thread } from '../../entity/index';
import {
    user as userData,
    noteData,
    playerData,
    teamData
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
    });
});

describe("thread queries", () => {

});