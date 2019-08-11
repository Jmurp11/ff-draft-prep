import { request } from 'graphql-request';

import { startServer } from '../start-server';
import { AddressInfo } from 'net';
import { Player, Projection } from '../entity';
import { 
    player, projection, 
    createPlayer, addProjection,
    getPlayerById, getPlayers,
    getProjections, getProjectionsByPlatform,
    getProjectionsByPlayer
} from './constants';

let getHost = () => '';

beforeAll(async () => {
    const app = await startServer();
    const { port } = app.address() as AddressInfo;
    getHost = () => `http://127.0.0.1:${port}`;
});

test('Create Player', async () => {
    const firstName = player.firstName;
    const lastName = player.lastName;

    const response = await request(getHost(), createPlayer);
    expect(response).toEqual({ createPlayer: true });

    const players = await Player.find({ where: { firstName, lastName } });

    expect(players).toHaveLength(1);

    const playerTest = players[0];

    expect(playerTest.firstName).toEqual(player.firstName);
    expect(playerTest.lastName).toEqual(player.lastName)
    expect(playerTest.team).toEqual(player.team);
    expect(playerTest.position).toEqual(player.position);
});

test('Add Projection', async () => {
    const firstName = player.firstName;
    const lastName = player.lastName;

    const players = await Player.find({ where: { firstName, lastName } });

    const playerTest = players[0];

    projection.playerId = playerTest.id;

    const playerId = projection.playerId;

    const response2 = await request(getHost(), addProjection(playerId));

    expect(response2).toEqual({ addProjection: true });

    const projections = await Projection.find({ where: { playerId } });

    const projTest = projections[0];

    expect(projTest.playerId).toEqual(projection.playerId);
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

test('Get Player By ID', async () => {
    const response = await request(getHost(), createPlayer);
    expect(response).toEqual({ createPlayer: true });

    console.log(JSON.stringify(response));

    const players = await Player.find();

    const playerTest = players[0];

    console.log(JSON.stringify(`Player ID: ${playerTest.id}`));

    console.log(JSON.stringify(getPlayerById(playerTest.id)));
    const response2 = await request(getHost(), getPlayerById(playerTest.id));
    
    console.log(`Response: ${JSON.stringify(response2.getPlayerById)}`);

    const result = response2.getPlayerById;

    expect(result.firstName).toEqual(player.firstName);
    expect(result.lastName).toEqual(player.lastName);
    expect(result.team).toEqual(player.team);
    expect(result.position).toEqual(player.position);
});

test('Get Players', async () => {
    const response = await request(getHost(), createPlayer);
    expect(response).toEqual({ createPlayer: true });

    const response2 = await request(getHost(), getPlayers);
    const result = response2.getPlayers[0];

    expect(result.firstName).toEqual(player.firstName);
    expect(result.lastName).toEqual(player.lastName);
    expect(result.team).toEqual(player.team);
    expect(result.position).toEqual(player.position);
});

test('Get Projections', async () => {
    const firstName = player.firstName;
    const lastName = player.lastName;

    const players = await Player.find({ where: { firstName, lastName } });
    const playerTest = players[0];

    projection.playerId = playerTest.id;

    const playerId = projection.playerId;

    const response2 = await request(getHost(), addProjection(playerId));

    expect(response2).toEqual({ addProjection: true });

    const response3 = await request(getHost(), getProjections);

    const result = response3.getProjections[0];

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

test('Get Projections By Platform', async () => {
    const firstName = player.firstName;
    const lastName = player.lastName;

    const players = await Player.find({ where: { firstName, lastName } });

    const playerTest = players[0];

    projection.playerId = playerTest.id;

    const playerId = projection.playerId;

    const response2 = await request(getHost(), addProjection(playerId));

    expect(response2).toEqual({ addProjection: true });

    const projections = await Projection.find({ where: { playerId } });

    const projTest = projections[0];

    const response3 = await request(getHost(), getProjectionsByPlatform(projTest.platform));

    const result = response3.getProjectionsByPlatform[0];

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

    const players = await Player.find({ where: { firstName, lastName } });

    const playerTest = players[0];

    projection.playerId = playerTest.id;

    const playerId = projection.playerId;

    const response2 = await request(getHost(), addProjection(playerId));

    expect(response2).toEqual({ addProjection: true });

    const projections = await Projection.find({ where: { playerId } });

    const projTest = projections[0];

    const response3 = await request(getHost(), getProjectionsByPlayer(projTest.playerId));

    const result = response3.getProjectionsByPlayer[0];
    
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
