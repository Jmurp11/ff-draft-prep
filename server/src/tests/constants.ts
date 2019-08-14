export const host = 'http://localhost:4000';

export const playerData = {
    firstName: 'Leveon',
    lastName: 'Bell',
    team: 'NYJ',
    position: 'RB',
    rank: 7,
    tier: 2,
    bye: 11
};

export const projectionData = {
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
        createPlayer(firstName: "${playerData.firstName}", lastName: "${playerData.lastName}", 
            team: "${playerData.team}", position: "${playerData.position}", rank: ${playerData.rank},
            tier: ${playerData.tier}, bye: ${playerData.bye})
    }
`;

export const addProjection = (player: string): string => {
    const mutation = `
            mutation {
                addProjection(player: "${player}", platform: "${projectionData.platform}", 
                    completions: ${projectionData.completions}, attempts: ${projectionData.attempts}, passYards: ${projectionData.passYards}, passTd: ${projectionData.passTd}, 
                    interception: ${projectionData.interception}, carries: ${projectionData.carries}, rushYards: ${projectionData.rushYards}, rushTd: ${projectionData.rushTd}, 
                    fumbles: ${projectionData.fumbles}, targets: ${projectionData.targets}, receptions: ${projectionData.receptions}, receivingYards: ${projectionData.receivingYards}, 
                    receivingTd: ${projectionData.receivingTd})
            }
        `
    return mutation;
};

export const playerById = (id: string): string => {
    const query = `
        query {
            playerById(id: "${id}") {
                id,
                firstName,
                lastName,
                team,
                position,
                rank,
                tier,
                bye
            }
        }
    `;

    return query;
}

export const players = `
    query {
        players {
            id,
            firstName,
            lastName,
            team,
            position,
            rank,
            tier,
            bye
        }
    }
`;

export const projections = `
    query {
        projections {
            id,
            player,
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

export const projectionsByPlatform = (platform: string): string => {
    const query = `
        query {
            projectionsByPlatform(platform: "${platform}") {
                id,
                player,
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

export const projectionsByPlayer = (player: string): string => {
    const query = `
        query {
            projectionsByPlayer(player: "${player}") {
                id,
                player,
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