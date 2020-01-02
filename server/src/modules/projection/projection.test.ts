import { Team } from '../../entity/index';
import {
    playerData,
    teamData,
    projectionData
} from '../../constants/test-constants';
import { createTypeormConn, TestClient } from '../../utils';
import { Connection } from 'typeorm';

let conn: Connection;

beforeEach(async () => {
    conn = await createTypeormConn();
});

afterEach(async () => {
    conn.close();
});

describe("projection tests", () => {
    it('add projection', async () => {
        const client = await new TestClient(process.env.TEST_HOST as string);

        const response = await client.createTeam(teamData.city, teamData.nickname, teamData.abbreviation,
            teamData.bye, teamData.rank, teamData.passRank, teamData.rushRank, teamData.imageUrl,
            teamData.pointsFor, teamData.yards, teamData.plays, teamData.yardsPerPlay, teamData.turnovers,
            teamData.passAttempts, teamData.passCompletions, teamData.passYards, teamData.passTd,
            teamData.interception, teamData.netYardsPerPass, teamData.rushAttempt, teamData.rushYards,
            teamData.rushTd, teamData.yardsPerRush, teamData.scorePercentage, teamData.turnoverPercentage,
            teamData.offensiveLineRank, teamData.runningBackSoS);

        expect(response.data).toEqual({ createTeam: null });

        const team = await Team.find();

        const teamAbbrev = team[0].abbreviation;

        const response2 = await client.createPlayer(playerData.firstName, playerData.lastName, teamAbbrev,
            playerData.position, playerData.rank, playerData.adp, playerData.tier)

        expect(response2.data).toEqual({ createPlayer: null });

        const response3 = await client.addProjection(playerData.firstName, playerData.lastName, teamData.abbreviation,
            projectionData.completions, projectionData.attempts, projectionData.passYards, projectionData.passTd,
            projectionData.interception, projectionData.carries, projectionData.rushYards, projectionData.rushTd, projectionData.fumbles,
            projectionData.receptions, projectionData.receivingYards, projectionData.receivingTd, projectionData.fantasyPoints);

        expect(response3.data).toEqual({ addProjection: null });
    });

    it('get projections', async () => {
        const client = await new TestClient(process.env.TEST_HOST as string);

        const response = await client.createTeam(teamData.city, teamData.nickname, teamData.abbreviation,
            teamData.bye, teamData.rank, teamData.passRank, teamData.rushRank, teamData.imageUrl,
            teamData.pointsFor, teamData.yards, teamData.plays, teamData.yardsPerPlay, teamData.turnovers,
            teamData.passAttempts, teamData.passCompletions, teamData.passYards, teamData.passTd,
            teamData.interception, teamData.netYardsPerPass, teamData.rushAttempt, teamData.rushYards,
            teamData.rushTd, teamData.yardsPerRush, teamData.scorePercentage, teamData.turnoverPercentage,
            teamData.offensiveLineRank, teamData.runningBackSoS);

        expect(response.data).toEqual({ createTeam: null });

        const team = await Team.find();

        const teamAbbrev = team[0].abbreviation;

        const response2 = await client.createPlayer(playerData.firstName, playerData.lastName, teamAbbrev,
            playerData.position, playerData.rank, playerData.adp, playerData.tier)

        expect(response2.data).toEqual({ createPlayer: null });

        const response3 = await client.addProjection(playerData.firstName, playerData.lastName, teamData.abbreviation,
            projectionData.completions, projectionData.attempts, projectionData.passYards, projectionData.passTd,
            projectionData.interception, projectionData.carries, projectionData.rushYards, projectionData.rushTd, projectionData.fumbles,
            projectionData.receptions, projectionData.receivingYards, projectionData.receivingTd, projectionData.fantasyPoints);

        expect(response3.data).toEqual({ addProjection: null });

        const response4 = await client.projections();

        expect(response4.data.projections[0].player.firstName).toEqual(playerData.firstName);
    });
});