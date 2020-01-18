import { User, Draft, DraftPick, Player, Team } from '../../entity';
import {
    user as userData,
    draftData,
    teamData,
    playerData,
} from '../../constants/test-constants';
import { createTypeormConn, TestClient } from '../../utils';
import { Connection } from 'typeorm';

let conn: Connection;
const email = "bob5@bob.com";
const password = "jlkajoioiqwe";
let userId: string;
let draftId: string;
let playerId: number;
let teamId: number;

beforeEach(async () => {
    conn = await createTypeormConn();
    const user = await User.create({
        email,
        password,
        username: userData.username,
        confirmed: true
    }).save();
    userId = user.id;

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

    const draft = await Draft.create({
        user: userId,
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

describe("draft picks mutations", () => {
    it('create draft picks', async () => {
        const client = new TestClient(process.env.TEST_HOST as string);

        const response = await client.createDraftPick(
            draftId,
            playerId,
            1
        );

        expect(response.data).toEqual({ createDraftPick: null });
        
        const draftPicks = await DraftPick.find();

        console.log(JSON.stringify(draftPicks));

        console.log(JSON.stringify(await Draft.find()));
    });
});

describe("draft picks queries", () => {
    it('get draft picks by draft', async () => {
        const client = new TestClient(process.env.TEST_HOST as string);
        
        await client.createDraftPick(
            draftId,
            playerId,
            1
        );

        const draftPicks = await DraftPick.find();
        const draftPick = draftPicks[0].id;

        const response = await client.draftPicks(draftId);

        expect(response.data.draftPicks).toHaveLength(1);

        expect(response.data.draftPicks[0].id).toEqual(draftPick);
        expect(response.data.draftPicks[0].draft.id).toEqual(draftId);
    });
});