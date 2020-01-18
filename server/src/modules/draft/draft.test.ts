import { User, Draft } from '../../entity';
import {
    user as userData,
    draftData,
} from '../../constants/test-constants';
import { createTypeormConn, TestClient } from '../../utils';
import { Connection } from 'typeorm';

let conn: Connection;
const email = "bob5@bob.com";
const password = "jlkajoioiqwe";
let userId: string;
let userId2: string;
let draftId: string;

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

    await Draft.create({
        user: userId,
        date: draftData.date,
        type: draftData.type,
        numberOfTeams: draftData.numberOfTeams,
        title: 'test'
    }).save();

    const draft = await Draft.create({
        user: userId2,
        date: draftData.date,
        type: draftData.type,
        numberOfTeams: draftData.numberOfTeams,
        title: draftData.title
    }).save();
    draftId = draft.id;
});

afterEach(async () => {
    conn.close();
});

describe("draft mutations", () => {
    it('create draft', async () => {
        const client = new TestClient(process.env.TEST_HOST as string);

        const response = await client.createDraft(
            userId,
            draftData.date,
            draftData.type,
            draftData.numberOfTeams,
            draftData.title
        );

        expect(response.data).toEqual({ createDraft: null });
    });
});

describe("draft queries", () => {
    it('get drafts by user', async () => {
        const client = new TestClient(process.env.TEST_HOST as string);
        
        const response = await client.drafts(userId2);

        expect(response.data.drafts).toHaveLength(1);

        expect(response.data.drafts[0].user.id).toEqual(userId2);
    });

    it('get draft by id', async () => {
        const client = new TestClient(process.env.TEST_HOST as string);
        
        const response = await client.draft(draftId);

        expect(response.data.draft.id).toEqual(draftId);
        expect(response.data.draft.user.id).toEqual(userId2);
    });
});