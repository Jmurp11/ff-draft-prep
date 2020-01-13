import { User, Player, Team, Note } from '../../entity/index';
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
let playerId: number;
let teamId: number;
let noteId: string;

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

    const team = await Team.create({
        city: teamData.city,
        nickname: teamData.nickname,
        abbreviation: teamData.abbreviation,
        bye: teamData.bye,
        imageUrl: teamData.imageUrl,
        rank: teamData.rank,
        passRank: teamData.passRank,
        rushRank: teamData.rushRank,
        pointsFor: teamData.pointsFor,
        yards: teamData.yards,
        plays: teamData.plays,
        yardsPerPlay: teamData.yardsPerPlay,
        turnovers: teamData.turnovers,
        passAttempts: teamData.passAttempts,
        passCompletions: teamData.passCompletions,
        passYards: teamData.passYards,
        passTd: teamData.passTd,
        interception: teamData.interception,
        netYardsPerPass: teamData.netYardsPerPass,
        rushAttempt: teamData.rushAttempt,
        rushYards: teamData.rushYards,
        rushTd: teamData.rushTd,
        yardsPerRush: teamData.yardsPerRush,
        scorePercentage: teamData.scorePercentage,
        turnoverPercentage: teamData.turnoverPercentage,
        offensiveLineRank: teamData.offensiveLineRank,
        runningBackSoS: teamData.runningBackSoS
    }).save();
    teamId = team.id;

    const player = await Player.create({
        firstName: playerData.firstName,
        lastName: playerData.lastName,
        team: teamId,
        position: playerData.position,
        rank: playerData.rank,
        adp: playerData.adp,
        tier: playerData.tier
    }).save();
    playerId = player.id;

    const newNote = await Note.create({
        user: userId,
        player: playerId,
        date: noteData.date,
        title: 'test',
        body: noteData.body,
        source: noteData.source
    }).save();
    noteId = newNote.id;
});

afterEach(async () => {
    conn.close();
});

describe("note mutations", () => {
    it('can add note', async () => {
        const client = new TestClient(process.env.TEST_HOST as string);

        const response = await client.addNote(userId, playerId, noteData.date,
            noteData.title, noteData.body, noteData.source);

        expect(response.data).toEqual({ addNote: null });
    });

    it('can edit note', async () => {
        const newDate = '01/13/2020';
        const newTitle = 'test2';
        const newBody = 'test';
        const newSource = 'test';

        const client = new TestClient(process.env.TEST_HOST as string);

        const response = await client.editNote(noteId, userId, playerId, newDate,
            newTitle, newBody, newSource);

        expect(response.data).toEqual({ editNote: null });

        const editedNote = await Note.findOne({
            where: { id: noteId }
        });

        if (editedNote) {
            expect(editedNote.date).toEqual(newDate);
            expect(editedNote.title).toEqual(newTitle);
            expect(editedNote.body).toEqual(newBody);
            expect(editedNote.source).toEqual(newSource);
        } else {
            fail(new Error('Note doesn\'t exist'));
        }
    });

    it('can delete note', async () => {
        const client = new TestClient(process.env.TEST_HOST as string);

        const response = await client.deleteNote(noteId);

        expect(response.data).toEqual({ deleteNote: null });

        const emptyArray = await Note.find();

        expect(emptyArray).toHaveLength(0);
    });
});

describe("note queries", () => {
    it('return note by id', async () => {
        const client = new TestClient(process.env.TEST_HOST as string);

        const response = await client.note(noteId);

        console.log(JSON.stringify(response));

        expect(response.data.note.id).toEqual(noteId);
        expect(response.data.note.title).toEqual('test');
    });

    it('return all notes', async () => {
        const client = new TestClient(process.env.TEST_HOST as string);

        const response = await client.notes();

        expect(response.data.notes).toHaveLength(1);
    });

    it('return notes by user', async () => {
        const client = new TestClient(process.env.TEST_HOST as string);

        await client.addNote(userId2, playerId, noteData.date,
            noteData.title, noteData.body, noteData.source);

        const response = await client.notesByUser(userId);

        expect(response.data.notesByUser).toHaveLength(1);
        expect(response.data.notesByUser[0].user.id).toEqual(userId);
    });
});