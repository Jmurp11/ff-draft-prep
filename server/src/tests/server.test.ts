import { request } from 'graphql-request';

import { startServer } from '../start-server';
import { AddressInfo } from 'net';
import { Player, Projection } from '../entity';
import { 
    playerData, projectionData, 
    createPlayer, addProjection,
    playerById, players,
    projections, projectionsByPlatform,
    projectionsByPlayer
} from './constants';

let getHost = () => '';

beforeAll(async () => {
    const app = await startServer();
    const { port } = app.address() as AddressInfo;
    getHost = () => `http://127.0.0.1:${port}`;
});

test('Create Player', async () => {
    const firstName = playerData.firstName;
    const lastName = playerData.lastName;

    await callCreatePlayerMutation();

    const result = await Player.find({ where: { firstName, lastName } });

    expect(result).toHaveLength(1);

    const playerTest = result[0];

    expect(playerTest.firstName).toEqual(playerData.firstName);
    expect(playerTest.lastName).toEqual(playerData.lastName)
    expect(playerTest.team).toEqual(playerData.team);
    expect(playerTest.position).toEqual(playerData.position);
    expect(playerTest.rank).toEqual(playerData.rank);
    expect(playerTest.tier).toEqual(playerData.tier);
    expect(playerTest.bye).toEqual(playerData.bye);
});

test('Add Projection', async () => {
    const firstName = playerData.firstName;
    const lastName = playerData.lastName;

    const playerId = await getPlayerId(firstName, lastName);

    await callAddProjection(playerId);

    const result = await Projection.find({ where: { playerId } });

    const projTest = result[0];

    expect(projTest.player).toEqual(playerId);
    expect(projTest.platform).toEqual(projectionData.platform)
    expect(projTest.completions).toEqual(projectionData.completions);
    expect(projTest.attempts).toEqual(projectionData.attempts);
    expect(projTest.passYards).toEqual(projectionData.passYards);
    expect(projTest.passTd).toEqual(projectionData.passTd)
    expect(projTest.interception).toEqual(projectionData.interception);
    expect(projTest.carries).toEqual(projectionData.carries);
    expect(projTest.rushYards).toEqual(projectionData.rushYards);
    expect(projTest.rushTd).toEqual(projectionData.rushTd);
    expect(projTest.fumbles).toEqual(projectionData.fumbles)
    expect(projTest.targets).toEqual(projectionData.targets);
    expect(projTest.targets).toEqual(projectionData.receptions);
    expect(projTest.receivingYards).toEqual(projectionData.receivingYards);
    expect(projTest.receivingTd).toEqual(projectionData.receivingTd);
});

test('Get Player By ID', async () => {
    await callCreatePlayerMutation();

    const playerResult = await Player.find();

    const playerTest = playerResult[0];

    console.log(JSON.stringify(`Player ID: ${JSON.stringify(playerTest)}`));

    const result = await callPlayerById(playerTest.id);

    console.log(JSON.stringify(result));
    expect(result.firstName).toEqual(playerData.firstName);
    expect(result.lastName).toEqual(playerData.lastName);
    expect(result.team).toEqual(playerData.team);
    expect(result.position).toEqual(playerData.position);
});

test('Get Players', async () => {
    await callCreatePlayerMutation();

    const response2 = await request(getHost(), players);
    const result = response2.players[0];

    expect(result.firstName).toEqual(playerData.firstName);
    expect(result.lastName).toEqual(playerData.lastName);
    expect(result.team).toEqual(playerData.team);
    expect(result.position).toEqual(playerData.position);
});

test('Get Projections', async () => {
    const firstName = playerData.firstName;
    const lastName = playerData.lastName;

    const playerId = await getPlayerId(firstName, lastName);

    await callAddProjection(playerId); 

    const response = await request(getHost(), projections);

    const result = response.projections[0];

    expect(result.player).toEqual(playerId);
    expect(result.platform).toEqual(projectionData.platform);
    expect(result.completions).toEqual(projectionData.completions);
    expect(result.attempts).toEqual(projectionData.attempts);
    expect(result.passYards).toEqual(projectionData.passYards);
    expect(result.passTd).toEqual(projectionData.passTd);
    expect(result.interception).toEqual(projectionData.interception);
    expect(result.carries).toEqual(projectionData.carries);
    expect(result.rushYards).toEqual(projectionData.rushYards);
    expect(result.rushTd).toEqual(projectionData.rushTd);
    expect(result.fumbles).toEqual(projectionData.fumbles);
    expect(result.targets).toEqual(projectionData.targets);
    expect(result.receivingYards).toEqual(projectionData.receivingYards);
    expect(result.receptions).toEqual(projectionData.receptions);
    expect(result.receivingTd).toEqual(projectionData.receivingTd);
});

test('Get Projections By Platform', async () => {
    const firstName = playerData.firstName;
    const lastName = playerData.lastName;

    const playerId = await getPlayerId(firstName, lastName);

    await callAddProjection(playerId);

    const projTest = await getProjectionByPlayerId(playerId);

    const response = await request(getHost(), projectionsByPlatform(projTest.platform));

    const result = response.projectionsByPlatform[0];

    expect(result.player).toEqual(playerId);
    expect(result.platform).toEqual(projectionData.platform);
    expect(result.completions).toEqual(projectionData.completions);
    expect(result.attempts).toEqual(projectionData.attempts);
    expect(result.passYards).toEqual(projectionData.passYards);
    expect(result.passTd).toEqual(projectionData.passTd);
    expect(result.interception).toEqual(projectionData.interception);
    expect(result.carries).toEqual(projectionData.carries);
    expect(result.rushYards).toEqual(projectionData.rushYards);
    expect(result.rushTd).toEqual(projectionData.rushTd);
    expect(result.fumbles).toEqual(projectionData.fumbles);
    expect(result.targets).toEqual(projectionData.targets);
    expect(result.receivingYards).toEqual(projectionData.receivingYards);
    expect(result.receptions).toEqual(projectionData.receptions);
    expect(result.receivingTd).toEqual(projectionData.receivingTd);
});

test('Get Projections By Player', async () => {
    const firstName = playerData.firstName;
    const lastName = playerData.lastName;

    const playerId = await getPlayerId(firstName, lastName);

    await callAddProjection(playerId);

    const projTest = await getProjectionByPlayerId(playerId);

    const response3 = await request(getHost(), projectionsByPlayer(projTest.player));

    const result = response3.projectionsByPlayer[0];
    
    expect(result.player).toEqual(playerId);
    expect(result.platform).toEqual(projectionData.platform);
    expect(result.completions).toEqual(projectionData.completions);
    expect(result.attempts).toEqual(projectionData.attempts);
    expect(result.passYards).toEqual(projectionData.passYards);
    expect(result.passTd).toEqual(projectionData.passTd);
    expect(result.interception).toEqual(projectionData.interception);
    expect(result.carries).toEqual(projectionData.carries);
    expect(result.rushYards).toEqual(projectionData.rushYards);
    expect(result.rushTd).toEqual(projectionData.rushTd);
    expect(result.fumbles).toEqual(projectionData.fumbles);
    expect(result.targets).toEqual(projectionData.targets);
    expect(result.receivingYards).toEqual(projectionData.receivingYards);
    expect(result.receptions).toEqual(projectionData.receptions);
    expect(result.receivingTd).toEqual(projectionData.receivingTd);
});

const callCreatePlayerMutation = async () => {
    const response = await request(getHost(), createPlayer);
    expect(response).toEqual({ createPlayer: true });
};

const callAddProjection = async (playerId: string) => {
    const response = await request(getHost(), addProjection(playerId));
    expect(response).toEqual({ addProjection: true });
};

const callPlayerById = async (id: string) => {
    const response = await request(getHost(), playerById(id));

    return response.playerById;
};

const getPlayerId = async (firstName: string, lastName: string) => {
    const playersResult = await Player.find({ where: { firstName, lastName } });
    const playerTest = playersResult[0];
    const playerId = playerTest.id;

    return playerId;
};

const getProjectionByPlayerId = async (id: string) => {
    const result = await Projection.find({ where: { player: id } });
    return result[0];
};