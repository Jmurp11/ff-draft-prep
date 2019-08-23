import { request } from 'graphql-request';

import { startServer } from '../start-server';
import { AddressInfo } from 'net';
import { Player, Projection, Team } from '../entity';
import { 
    playerData, projectionData, teamData,
    createTeam, createPlayer, addProjection,
    playerById, players,
    projections, projectionsByPlayer, teams, 
    teamById, teamByAbbreviation
} from './constants';

let getHost = () => '';

beforeAll(async () => {
    const app = await startServer();
    const { port } = app.address() as AddressInfo;
    getHost = () => `http://127.0.0.1:${port}`;
});

test('Create Team', async () => {
    await callCreateTeamMutation();

    const newTeam = await getTeams();

    expect(newTeam.city).toEqual(teamData.city);
    expect(newTeam.nickname).toEqual(teamData.nickname);
    expect(newTeam.abbreviation).toEqual(teamData.abbreviation);
    expect(newTeam.bye).toEqual(playerData.bye);
});

test('Create Player', async () => {
    const firstName = playerData.firstName;
    const lastName = playerData.lastName;

    await callCreateTeamMutation();
    
    const newTeam = await getTeams();
    
    await callCreatePlayerMutation(newTeam.abbreviation);

    const result = await Player.find({ where: { firstName, lastName } });

    expect(result).toHaveLength(1);

    const playerTest = result[0];

    expect(playerTest.firstName).toEqual(playerData.firstName);
    expect(playerTest.lastName).toEqual(playerData.lastName)
    expect(playerTest.team).toEqual(newTeam.id.toString());
    expect(playerTest.position).toEqual(playerData.position);
    expect(playerTest.rank).toEqual(playerData.rank);
    expect(playerTest.tier).toEqual(playerData.tier);
});

test('Add Projection', async () => {
    const firstName = playerData.firstName;
    const lastName = playerData.lastName;

    const playerResult = await getPlayer(firstName, lastName);
    
    await callAddProjection(playerResult.firstName, playerResult.lastName, teamData.abbreviation);

    const id = playerResult.id;

    const result = await Projection.find({ where: { player: id } });

    const projTest = result[0];

    expect(projTest.player).toEqual(playerResult.id.toString());
    expect(projTest.completions).toEqual(projectionData.completions);
    expect(projTest.attempts).toEqual(projectionData.attempts);
    expect(projTest.passYards).toEqual(projectionData.passYards);
    expect(projTest.passTd).toEqual(projectionData.passTd)
    expect(projTest.interception).toEqual(projectionData.interception);
    expect(projTest.carries).toEqual(projectionData.carries);
    expect(projTest.rushYards).toEqual(projectionData.rushYards);
    expect(projTest.rushTd).toEqual(projectionData.rushTd);
    expect(projTest.fumbles).toEqual(projectionData.fumbles)
    expect(projTest.receptions).toEqual(projectionData.receptions);
    expect(projTest.receivingYards).toEqual(projectionData.receivingYards);
    expect(projTest.receivingTd).toEqual(projectionData.receivingTd);
    expect(projTest.fantasyPoints).toEqual(projectionData.fantasyPoints);

});

test('Get Teams', async () => {
    await callCreateTeamMutation();

    const response = await request(getHost(), teams);

    expect(response.teams[0].city).toEqual(teamData.city);
    expect(response.teams[0].nickname).toEqual(teamData.nickname);
    expect(response.teams[0].abbreviation).toEqual(teamData.abbreviation);
});

test('Get Teams By ID', async () => {
    await callCreateTeamMutation();

    const newTeam = await getTeams();
    
    const id = newTeam.id;
    const response = await request(getHost(), teamById(id));
    
    expect(response.teamById.city).toEqual(teamData.city);
    expect(response.teamById.nickname).toEqual(teamData.nickname);
    expect(response.teamById.abbreviation).toEqual(teamData.abbreviation);
});

test('Get Teams By Abbreviation', async () => {
    await callCreateTeamMutation();

    const newTeam = await getTeams();

    const abbrev = newTeam.abbreviation;

    const response = await request(getHost(), teamByAbbreviation(abbrev));

    expect(response.teamByAbbreviation.city).toEqual(teamData.city);
    expect(response.teamByAbbreviation.nickname).toEqual(teamData.nickname);
    expect(response.teamByAbbreviation.abbreviation).toEqual(teamData.abbreviation);
});

test('Get Player By ID', async () => {
    const firstName = playerData.firstName;
    const lastName = playerData.lastName;

    const result = await Player.find({ where: { firstName, lastName } });
    const id = parseInt(result[0].team.toString(), 10);
    const queryResult = await callPlayerById(result[0].id);

    expect(queryResult[0].firstName).toEqual(playerData.firstName);
    expect(queryResult[0].lastName).toEqual(playerData.lastName);
    expect(queryResult[0].team.id).toEqual(id);
    expect(queryResult[0].position).toEqual(playerData.position);
});

test('Get Players', async () => {

    const newTeam = await getTeams();

    const response2 = await request(getHost(), players);
    const result = response2.players[0];

    expect(result.firstName).toEqual(playerData.firstName);
    expect(result.lastName).toEqual(playerData.lastName);
    expect(result.team.id).toEqual(newTeam.id);
    expect(result.position).toEqual(playerData.position);
});

test('Get Projections', async () => {
    const firstName = playerData.firstName;
    const lastName = playerData.lastName;

    const playerResult = await getPlayer(firstName, lastName);

    const response = await request(getHost(), projections);

    const result = response.projections[0];

    expect(result.player.id).toEqual(playerResult.id);
    expect(result.completions).toEqual(projectionData.completions);
    expect(result.attempts).toEqual(projectionData.attempts);
    expect(result.passYards).toEqual(projectionData.passYards);
    expect(result.passTd).toEqual(projectionData.passTd);
    expect(result.interception).toEqual(projectionData.interception);
    expect(result.carries).toEqual(projectionData.carries);
    expect(result.rushYards).toEqual(projectionData.rushYards);
    expect(result.rushTd).toEqual(projectionData.rushTd);
    expect(result.fumbles).toEqual(projectionData.fumbles);
    expect(result.fantasyPoints).toEqual(projectionData.fantasyPoints);
    expect(result.receivingYards).toEqual(projectionData.receivingYards);
    expect(result.receptions).toEqual(projectionData.receptions);
    expect(result.receivingTd).toEqual(projectionData.receivingTd);
});

test('Get Projections By Player', async () => {
    const firstName = playerData.firstName;
    const lastName = playerData.lastName;

    const playerResult = await getPlayer(firstName, lastName);


    const response3 = await request(getHost(), projectionsByPlayer(playerResult.id));

    const result = response3.projectionsByPlayer[0];
    expect(result.player.id).toEqual(playerResult.id);
    expect(result.completions).toEqual(projectionData.completions);
    expect(result.attempts).toEqual(projectionData.attempts);
    expect(result.passYards).toEqual(projectionData.passYards);
    expect(result.passTd).toEqual(projectionData.passTd);
    expect(result.interception).toEqual(projectionData.interception);
    expect(result.carries).toEqual(projectionData.carries);
    expect(result.rushYards).toEqual(projectionData.rushYards);
    expect(result.rushTd).toEqual(projectionData.rushTd);
    expect(result.fumbles).toEqual(projectionData.fumbles);
    expect(result.fantasyPoints).toEqual(projectionData.fantasyPoints);
    expect(result.receivingYards).toEqual(projectionData.receivingYards);
    expect(result.receptions).toEqual(projectionData.receptions);
    expect(result.receivingTd).toEqual(projectionData.receivingTd);
});

const callCreateTeamMutation = async () => {
    const response = await request(getHost(), createTeam);
    expect(response).toEqual({ createTeam: true });
};

const callCreatePlayerMutation = async (team: string) => {
    const response2 = await request(getHost(), createPlayer(team));
    expect(response2).toEqual({ createPlayer: true });
};

const callAddProjection = async (firstName: string, lastName: string, team: string) => {
    const response = await request(getHost(), addProjection(firstName, lastName, team));
    expect(response).toEqual({ addProjection: true });
};

const callPlayerById = async (id: number) => {
    const response = await request(getHost(), playerById(id));
    return response.playerById;
};

const getPlayer = async (firstName: string, lastName: string) => {
    const playersResult = await Player.find({ where: { firstName, lastName } });
    const playerTest = playersResult[0];

    return playerTest;
};

const getTeams = async () => {
    const teamQueryResult = await Team.find();
    const lastTeamEntry = teamQueryResult[0];

    return lastTeamEntry;
};