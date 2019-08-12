export const host = 'http://localhost:4000';

export const team = {
    city: 'New York',
    nickname: 'Jets',
    abbreviation: 'NYJ'
}

export const player = {
    firstName: 'Leveon',
    lastName: 'Bell',
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

export const createTeam = `
    mutation {
        createTeam(city: "${team.city}", nickname: "${team.nickname}", 
            abbreviation: "${team.abbreviation}")
    }
`;


export const createPlayer = (teamId: string) => {
    const mutation = `
        mutation {
            createPlayer(firstName: "${player.firstName}", lastName: "${player.lastName}", 
                teamId: "${teamId}", position: "${player.position}")
        }
    `;

    return mutation
};

export const addProjection = (playerId: string): string => {
    const mutation = `
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

export const getTeamById = (id: string): string => {
    const query = `
        query {
            getTeamById(id: "${id}") {
                id,
                city,
                nickname,
                abbreviation
            }
        }
    `;

    return query;
}

export const getTeams = `
    query {
        getTeams {
            id,
            city,
            nickname,
            abbreviation
        }
    }
`;

export const getPlayerById = (id: string): string => {
    const query = `
        query {
            getPlayerById(id: "${id}") {
                id,
                firstName,
                lastName,
                teamId {
                    id,
                    city,
                    nickname,
                    abbreviation
                },
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
            teamId {
                id,
                city,
                nickname,
                abbreviation
            },
            position
        }
    }
`;

export const getProjections = `
    query {
        getProjections {
            id,
            playerId {
                id,
                firstName,
                lastName,
                teamId {
                    id,
                    city,
                    nickname,
                    abbreviation
                },
                position
            },
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
    const query = `
        query {
            getProjectionsByPlatform(platform: "${platform}") {
                id,
                playerId {
                    id,
                    firstName,
                    lastName,
                    teamId {
                        id,
                        city,
                        nickname,
                        abbreviation
                    },
                    position
                },
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
    const query = `
        query {
            getProjectionsByPlayer(playerId: "${playerId}") {
                id,
                playerId {
                    id,
                    firstName,
                    lastName,
                    teamId {
                        id,
                        city,
                        nickname,
                        abbreviation
                    },
                    position
                },
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