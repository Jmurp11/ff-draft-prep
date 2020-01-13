import { Team } from '../../entity/index';
import {
    teamData,
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

describe("team tests", () => {
    it('add team', async () => {
        const client = new TestClient(process.env.TEST_HOST as string);

        const response = await client.createTeam(teamData.city, teamData.nickname, teamData.abbreviation,
            teamData.bye, teamData.rank, teamData.passRank, teamData.rushRank, teamData.imageUrl,
            teamData.pointsFor, teamData.yards, teamData.plays, teamData.yardsPerPlay, teamData.turnovers,
            teamData.passAttempts, teamData.passCompletions, teamData.passYards, teamData.passTd,
            teamData.interception, teamData.netYardsPerPass, teamData.rushAttempt, teamData.rushYards,
            teamData.rushTd, teamData.yardsPerRush, teamData.scorePercentage, teamData.turnoverPercentage,
            teamData.offensiveLineRank, teamData.runningBackSoS);

        expect(response.data).toEqual({ createTeam: null });

        const allTeams = await Team.find();

        const team = allTeams[0];

        expect(team.city).toEqual(teamData.city);
        expect(team.nickname).toEqual(teamData.nickname);
    });

    it('get teams', async () => {
        const client = new TestClient(process.env.TEST_HOST as string);

        const response = await client.createTeam(teamData.city, teamData.nickname, teamData.abbreviation,
            teamData.bye, teamData.rank, teamData.passRank, teamData.rushRank, teamData.imageUrl,
            teamData.pointsFor, teamData.yards, teamData.plays, teamData.yardsPerPlay, teamData.turnovers,
            teamData.passAttempts, teamData.passCompletions, teamData.passYards, teamData.passTd,
            teamData.interception, teamData.netYardsPerPass, teamData.rushAttempt, teamData.rushYards,
            teamData.rushTd, teamData.yardsPerRush, teamData.scorePercentage, teamData.turnoverPercentage,
            teamData.offensiveLineRank, teamData.runningBackSoS);

        expect(response.data).toEqual({ createTeam: null });

        const response2 = await client.teams();

        expect(response2.data.teams[0].city).toEqual(teamData.city);
    });

    it('get team', async () => {
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
        const id = team[0].id;

        const response2 = await client.team(id);

        expect(response2.data.team.city).toEqual(teamData.city);
    });

    it('get teamByAbbreviation', async () => {
        const client = new TestClient(process.env.TEST_HOST as string);

        const response = await client.createTeam(teamData.city, teamData.nickname, teamData.abbreviation,
            teamData.bye, teamData.rank, teamData.passRank, teamData.rushRank, teamData.imageUrl,
            teamData.pointsFor, teamData.yards, teamData.plays, teamData.yardsPerPlay, teamData.turnovers,
            teamData.passAttempts, teamData.passCompletions, teamData.passYards, teamData.passTd,
            teamData.interception, teamData.netYardsPerPass, teamData.rushAttempt, teamData.rushYards,
            teamData.rushTd, teamData.yardsPerRush, teamData.scorePercentage, teamData.turnoverPercentage,
            teamData.offensiveLineRank, teamData.runningBackSoS);

        expect(response.data).toEqual({ createTeam: null });

        const response2 = await client.teamByAbbreviation(teamData.abbreviation);

        expect(response2.data.teamByAbbreviation.city).toEqual(teamData.city);
    });
});
