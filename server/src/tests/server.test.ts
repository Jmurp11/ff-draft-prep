import { request } from 'graphql-request';

import { startServer } from '../start-server';
import { AddressInfo } from 'net';
import { Player, Projection, Team } from '../entity';
import { 
    player, projection, team,
    createPlayer, addProjection,
    getPlayerById, getPlayers,
    getProjections, getProjectionsByPlatform,
    getProjectionsByPlayer, createTeam,
    getTeamById, getTeams
} from './constants';

let getHost = () => '';

beforeAll(async () => {
    const app = await startServer();
    const { port } = app.address() as AddressInfo;
    getHost = () => `http://127.0.0.1:${port}`;
});

test('Create Team', async () => {
    const city = team.city;
    
    const response = await request(getHost(), createTeam);
    expect(response).toEqual({ createTeam: true });

    const teams = await Team.find({ where: { city } });

    expect(teams).toHaveLength(1);

    const teamTest = teams[0];

    expect(teamTest.city).toEqual(team.city);
    expect(teamTest.nickname).toEqual(team.nickname);
    expect(teamTest.abbreviation).toEqual(team.abbreviation);
});

test('Create Player', async () => {
    const firstName = player.firstName;
    const lastName = player.lastName;
    const city = team.city;

    await request(getHost(), createTeam);

    const teams = await Team.find({ where: { city } });

    const teamTest = teams[0];

    const response2 = await request(getHost(), createPlayer(teamTest.id));
    expect(response2).toEqual({ createPlayer: true });

    const players = await Player.find({ where: { firstName, lastName } });

    expect(players).toHaveLength(1);

    const playerTest = players[0];

    expect(playerTest.firstName).toEqual(player.firstName);
    expect(playerTest.lastName).toEqual(player.lastName)
    expect(playerTest.teamId).toEqual(teamTest.id);
    expect(playerTest.position).toEqual(player.position);
});

test('Add Projection', async () => {
    const firstName = player.firstName;
    const lastName = player.lastName;
    const city = team.city;

    await request(getHost(), createTeam);

    const teams = await Team.find({ where: { city } });

    const teamTest = teams[0];

    await request(getHost(), createPlayer(teamTest.id));

    const players = await Player.find({ where: { firstName, lastName } });

    const playerTest = players[0];
    const playerId = playerTest.id;

    const response3 = await request(getHost(), addProjection(playerId));

    expect(response3).toEqual({ addProjection: true });

    const projections = await Projection.find({ where: { player } });

    const projTest = projections[0];

    expect(projTest.playerId).toEqual(playerId);
    expect(projTest.platform).toEqual(projection.platform)
    expect(projTest.completions).toEqual(projection.completions);
    expect(projTest.attempts).toEqual(projection.attempts);
    expect(projTest.passYards).toEqual(projection.passYards);
    expect(projTest.passTd).toEqual(projection.passTd)
    expect(projTest.interception).toEqual(projection.interception);
    expect(projTest.carries).toEqual(projection.carries);
    expect(projTest.rushYards).toEqual(projection.rushYards);
    expect(projTest.rushTd).toEqual(projection.rushTd);
    expect(projTest.fumbles).toEqual(projection.fumbles)
    expect(projTest.targets).toEqual(projection.targets);
    expect(projTest.targets).toEqual(projection.receptions);
    expect(projTest.receivingYards).toEqual(projection.receivingYards);
    expect(projTest.receivingTd).toEqual(projection.receivingTd);
});

test('Get Teams', async () => {
    await request(getHost(), createTeam);

    const response = await request(getHost(), getTeams);

    const result = response.getTeams[0];

    expect(result.city).toEqual(team.city);
    expect(result.nickname).toEqual(team.nickname);
    expect(result.abbreviation).toEqual(team.abbreviation);
});

test('Get Team By ID', async () => {
    const city = team.city;

    await request(getHost(), createTeam);

    const teams = await Team.find({ where: { city } });

    const teamTest = teams[0];
    console.log(JSON.stringify(teamTest.id));
    const response = await request(getHost(), getTeamById(teamTest.id));
    console.log(JSON.stringify(response));
    const result = response.getTeamById;
    console.log(JSON.stringify(result));
    expect(result.city).toEqual(team.city);
    expect(result.nickname).toEqual(team.nickname);
    expect(result.abbreviation).toEqual(team.abbreviation);
});

test('Get Player By ID', async () => {
    const firstName = player.firstName;
    const lastName = player.lastName;
    const city = team.city;

    await request(getHost(), createTeam);

    const teams = await Team.find({ where: { city } });

    const teamTest = teams[0];

    await request(getHost(), createPlayer(teamTest.id));

    const players = await Player.find({ where: { firstName, lastName } });

    const playerTest = players[0];

    const response3 = await request(getHost(), getPlayerById(playerTest.id));

    const result = response3.getPlayerById;

    expect(result.firstName).toEqual(player.firstName);
    expect(result.lastName).toEqual(player.lastName);
    expect(result.teamId).toEqual(teamTest.id);
    expect(result.position).toEqual(player.position);
});

test('Get Players', async () => {
    const city = team.city;

    await request(getHost(), createTeam);

    const teams = await Team.find({ where: { city } });

    const teamTest = teams[0];

    await request(getHost(), createPlayer(teamTest.id));

    const response3 = await request(getHost(), getPlayers);

    const result = response3.getPlayers[0];

    expect(result.firstName).toEqual(player.firstName);
    expect(result.lastName).toEqual(player.lastName);
    expect(result.teamId).toEqual(teamTest.id);
    expect(result.position).toEqual(player.position);
});

test('Get Projections', async () => {
    const firstName = player.firstName;
    const lastName = player.lastName;
    const city = team.city;

    const response = await request(getHost(), createTeam);
    expect(response).toEqual({ createTeam: true });

    const teams = await Team.find({ where: { city } });

    const teamTest = teams[0];

    const response2 = await request(getHost(), createPlayer(teamTest.id));
    expect(response2).toEqual({ createPlayer: true });

    const players = await Player.find({ where: { firstName, lastName } });

    const playerTest = players[0];
    const playerId = playerTest.id;

    const response3 = await request(getHost(), addProjection(playerId));

    expect(response3).toEqual({ addProjection: true });

    const response4 = await request(getHost(), getProjections);
    
    const result = response4.getProjections[0];

    expect(result.playerId).toEqual(playerId);
    expect(result.platform).toEqual(projection.platform);
    expect(result.completions).toEqual(projection.completions);
    expect(result.attempts).toEqual(projection.attempts);
    expect(result.passYards).toEqual(projection.passYards);
    expect(result.passTd).toEqual(projection.passTd);
    expect(result.interception).toEqual(projection.interception);
    expect(result.carries).toEqual(projection.carries);
    expect(result.rushYards).toEqual(projection.rushYards);
    expect(result.rushTd).toEqual(projection.rushTd);
    expect(result.fumbles).toEqual(projection.fumbles);
    expect(result.targets).toEqual(projection.targets);
    expect(result.receivingYards).toEqual(projection.receivingYards);
    expect(result.receptions).toEqual(projection.receptions);
    expect(result.receivingTd).toEqual(projection.receivingTd);
});

test('Get Projections By Platform', async () => {
    const firstName = player.firstName;
    const lastName = player.lastName;
    const city = team.city;

    const response = await request(getHost(), createTeam);
    expect(response).toEqual({ createTeam: true });

    const teams = await Team.find({ where: { city } });

    const teamTest = teams[0];

    const response2 = await request(getHost(), createPlayer(teamTest.id));
    expect(response2).toEqual({ createPlayer: true });

    const players = await Player.find({ where: { firstName, lastName } });

    const playerTest = players[0];
    const playerId = playerTest.id;

    const response3 = await request(getHost(), addProjection(playerId));

    expect(response3).toEqual({ addProjection: true });

    const projections = await Projection.find({ where: { playerId } });
    const projTest = projections[0];

    const response4 = await request(getHost(), getProjectionsByPlatform(projTest.platform));

    const result = response4.getProjectionsByPlatform[0];

    expect(result.playerId).toEqual(projection.playerId);
    expect(result.platform).toEqual(projection.platform);
    expect(result.completions).toEqual(projection.completions);
    expect(result.attempts).toEqual(projection.attempts);
    expect(result.passYards).toEqual(projection.passYards);
    expect(result.passTd).toEqual(projection.passTd);
    expect(result.interception).toEqual(projection.interception);
    expect(result.carries).toEqual(projection.carries);
    expect(result.rushYards).toEqual(projection.rushYards);
    expect(result.rushTd).toEqual(projection.rushTd);
    expect(result.fumbles).toEqual(projection.fumbles);
    expect(result.targets).toEqual(projection.targets);
    expect(result.receivingYards).toEqual(projection.receivingYards);
    expect(result.receptions).toEqual(projection.receptions);
    expect(result.receivingTd).toEqual(projection.receivingTd);
});

test('Get Projections By Player', async () => {
    const firstName = player.firstName;
    const lastName = player.lastName;
    const city = team.city;

    const response = await request(getHost(), createTeam);
    expect(response).toEqual({ createTeam: true });

    const teams = await Team.find({ where: { city } });

    const teamTest = teams[0];

    const response2 = await request(getHost(), createPlayer(teamTest.id));
    expect(response2).toEqual({ createPlayer: true });

    const players = await Player.find({ where: { firstName, lastName } });

    const playerTest = players[0];
    const playerId = playerTest.id;

    const response3 = await request(getHost(), addProjection(playerId));

    expect(response3).toEqual({ addProjection: true });

    const projections = await Projection.find({ where: { player } });
    const projTest = projections[0];
    const response4 = await request(getHost(), getProjectionsByPlayer(projTest.playerId));

    const result = response4.getProjectionsByPlayer[0];
    
    expect(result.playerId).toEqual(projection.playerId);
    expect(result.platform).toEqual(projection.platform);
    expect(result.completions).toEqual(projection.completions);
    expect(result.attempts).toEqual(projection.attempts);
    expect(result.passYards).toEqual(projection.passYards);
    expect(result.passTd).toEqual(projection.passTd);
    expect(result.interception).toEqual(projection.interception);
    expect(result.carries).toEqual(projection.carries);
    expect(result.rushYards).toEqual(projection.rushYards);
    expect(result.rushTd).toEqual(projection.rushTd);
    expect(result.fumbles).toEqual(projection.fumbles);
    expect(result.targets).toEqual(projection.targets);
    expect(result.receivingYards).toEqual(projection.receivingYards);
    expect(result.receptions).toEqual(projection.receptions);
    expect(result.receivingTd).toEqual(projection.receivingTd);
});
