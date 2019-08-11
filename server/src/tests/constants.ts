export const host = 'http://localhost:4000';

export const player = {
    firstName: 'Leveon',
    lastName: 'Bell',
    team: 'NYJ',
    position: 'RB'
};

export const projection = {
    playerId: '',
    platform: 'ESPN',
    completions: 0,
    attempts: 0,
    passYards: 0,
    passTd: 0,
    interception: 0,
    carries: 0,
    rushYards: 0,
    rushTd: 0,
    fumbles: 0,
    targets: 0,
    receptions: 0,
    receivingYards: 0,
    receivingTd: 0
}

export const createPlayer = `
    mutation {
        createPlayer(firstName: "${player.firstName}", lastName: "${player.lastName}", 
            team: "${player.team}", position: "${player.position}")
    }
`;

export const addProjection = (playerId: string): string => {
    let mutation = `
            mutation {
                addProjection(playerId: "${playerId}", platform: "${projection.platform}", 
                    completions: ${projection.completions}, attempts: ${projection.attempts}, passYards: ${projection.passYards}, passTd: ${projection.passTd}, 
                    interception: ${projection.interception}, carries: ${projection.carries}, rushYards: ${projection.rushYards}, rushTd: ${projection.rushTd}, 
                    fumbles: ${projection.fumbles}, targets: ${projection.targets}, receptions: ${projection.receptions}, receivingYards: ${projection.receivingYards}, 
                    receivingTd: ${projection.receivingTd})
            }
        `
    return mutation;
};

export const getPlayerById = (id: string): string => {
    let query = `
        query {
            getPlayerById(id: "${id}") {
                id,
                firstName,
                lastName,
                team,
                position
            }
        }
    `;

    return query;
}

export const getPlayers = `
    query {
        getPlayers {
            id,
            firstName,
            lastName,
            team,
            position
        }
    }
`;

export const getProjections = `
    query {
        getProjections {
            id,
            playerId,
            platform, 
            completions,             
            attempts,
            passYards,
            passTd,
            interception,
            carries,
            rushYards,
            rushTd,
            fumbles,
            targets,
            receptions,
            receivingYards,
            receivingTd
        }
    }
`;

export const getProjectionsByPlatform = (platform: string): string => {
    let query = `
        query {
            getProjectionsByPlatform(platform: "${platform}") {
                id,
                playerId,
                platform, 
                completions,             
                attempts,
                passYards,
                passTd,
                interception,
                carries,
                rushYards,
                rushTd,
                fumbles,
                targets,
                receptions,
                receivingYards,
                receivingTd
            }
        }
    `;

    return query;
};

export const getProjectionsByPlayer = (playerId: string): string => {
    let query = `
        query {
            getProjectionsByPlayer(playerId: "${playerId}") {
                id,
                playerId,
                platform, 
                completions,             
                attempts,
                passYards,
                passTd,
                interception,
                carries,
                rushYards,
                rushTd,
                fumbles,
                targets,
                receptions,
                receivingYards,
                receivingTd
            }
        }
    `;

    return query;
}