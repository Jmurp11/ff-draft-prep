import { request } from 'graphql-request';

import { startServer } from '../start-server';
import { AddressInfo } from 'net';
import { Player, Projection } from '../entity';
import { player, projection } from './constants';

let getHost = () => '';

beforeAll(async () => {
    const app = await startServer();
    const { port } = app.address() as AddressInfo;
    getHost = () => `http://127.0.0.1:${port}`;
});

const createPlayer = `
    mutation {
        createPlayer(firstName: "${player.firstName}", lastName: "${player.lastName}", 
            team: "${player.team}", position: "${player.position}")
    }
`;

const addProjection = `
    mutation {
        addProjection(playerId: "${projection.playerId}", platform: "${projection.platform}", 
            completions: ${projection.completions}, attempts: ${projection.attempts}, passYards: ${projection.passYards}, passTd: ${projection.passTd}, 
            interception: ${projection.interception}, carries: ${projection.carries}, rushYards: ${projection.rushYards}, rushTd: ${projection.rushTd}, 
            fumbles: ${projection.fumbles}, targets: ${projection.targets}, receptions: ${projection.receptions}, receivingYards: ${projection.receivingYards}, 
            receivingTd: ${projection.receivingTd})
    }
`;

test('Create Player', async () => {
    const firstName = player.firstName;
    const lastName = player.lastName;

    const response = await request(getHost(), createPlayer);
    console.log(`Response: ${JSON.stringify(response)}`);
    expect(response).toEqual({ createPlayer: true });

    const players = await Player.find({ where: { firstName, lastName } });

    expect(players).toHaveLength(1);

    const playerTest = players[0];
    console.log(`Player: ${JSON.stringify(playerTest)}`);

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

    const response2 = await request(getHost(), addProjection);
    
    expect(response2).toEqual({ addProjection: true });

    const projections = await Projection.find({ where: { playerId } });

    const projTest = projections[0];

    expect(projTest.playerId).toEqual(projection.playerId);
    expect(projTest.platform).toEqual(projection.platform)
    expect(projTest.completions).toEqual(projection.completions);
    expect(projTest.attempts).toEqual(projection.attempts);
    expect(projTest.passYards).toEqual(projection.passYards);
    expect(projTest.passTd).not.toEqual(projection.passTd)
    expect(projTest.interception).toEqual(projection.interception);
    expect(projTest.carries).toEqual(projection.carries);
    expect(projTest.rushYards).toEqual(projection.rushYards);
    expect(projTest.rushTd).toEqual(projection.rushTd);
    expect(projTest.fumbles).not.toEqual(projection.fumbles)
    expect(projTest.targets).toEqual(projection.targets);
    expect(projTest.targets).toEqual(projection.receptions);
    expect(projTest.receivingYards).toEqual(projection.receivingYards);
    expect(projTest.receivingTd).toEqual(projection.receivingTd);
});