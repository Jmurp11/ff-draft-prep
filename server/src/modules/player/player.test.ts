import { Player, Team } from '../../entity/index';
import {
    playerData,
    teamData
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

describe("player tests", () => {
    it('add player', async () => {
        const client = new TestClient(process.env.TEST_HOST as string);

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

        const playerResults = await Player.find();

        const player = playerResults[0];

        expect(player.firstName).toEqual(playerData.firstName);
    });

    it('get players', async () => {
        const client = new TestClient(process.env.TEST_HOST as string);

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

        const response3 = await client.players();

        expect(response3.data.players[0].firstName).toEqual(playerData.firstName);
    });

    it('get player', async () => {
        const client = new TestClient(process.env.TEST_HOST as string);

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

        const player = await Player.find();
        const id = player[0].id;

        const response3 = await client.player(id);
        expect(response3.data.player[0].firstName).toEqual(playerData.firstName);
    });
});
