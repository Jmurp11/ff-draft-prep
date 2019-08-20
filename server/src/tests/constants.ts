export const host = 'http://localhost:4000';

export const teamData = {
    city: 'New York',
    nickname: 'Jets',
    abbreviation: 'NYJ'
};

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

export const createTeam = `
    mutation {
        createTeam(city: "${teamData.city}", nickname: "${teamData.nickname}", 
            abbreviation: "${teamData.abbreviation}")
    }
`;

export const createPlayer = (team: number) => {
    const mutation = `
        mutation {
            createPlayer(firstName: "${playerData.firstName}", lastName: "${playerData.lastName}", 
                team: ${team}, position: "${playerData.position}", rank: ${playerData.rank},
                tier: ${playerData.tier}, bye: ${playerData.bye})
        }
    `;
    return mutation;
};

export const addProjection = (player: number): string => {
    const mutation = `
            mutation {
                addProjection(player: ${player}, platform: "${projectionData.platform}", 
                    completions: ${projectionData.completions}, attempts: ${projectionData.attempts}, passYards: ${projectionData.passYards}, passTd: ${projectionData.passTd}, 
                    interception: ${projectionData.interception}, carries: ${projectionData.carries}, rushYards: ${projectionData.rushYards}, rushTd: ${projectionData.rushTd}, 
                    fumbles: ${projectionData.fumbles}, targets: ${projectionData.targets}, receptions: ${projectionData.receptions}, receivingYards: ${projectionData.receivingYards}, 
                    receivingTd: ${projectionData.receivingTd})
            }
        `
    return mutation;
};

export const teams = `
    query {
        teams {
            id,
            city,
            nickname,
            abbreviation
        }
    }
`;

export const teamById = (id: number) => {
    const query = `
        query {
            teamById(id: ${id}) {
                id,
                city,
                nickname,
                abbreviation
            }
        }
    `;

    return query;
};

export const teamByAbbreviation = (abbreviation: string) => {
    const query = `
        query {
            teamByAbbreviation(abbreviation: "${abbreviation}") {
                id,
                city,
                nickname,
                abbreviation
            }
        }
    `;

    return query;
};

export const playerById = (id: number): string => {
    console.log(id);
    const query = `
        query {
            playerById(id: ${id}) {
                id,
                firstName,
                lastName,
                team {
                    id,
                    city,
                    nickname,
                    abbreviation
                },
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
            team {
                id,
                city,
                nickname,
                abbreviation
            },
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
            player {
                id,
                firstName,
                lastName,
                team {
                    id,
                    city,
                    nickname,
                    abbreviation
                }
                position,
                rank,
                tier,
                bye
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

export const projectionsByPlatform = (platform: string): string => {
    const query = `
        query {
            projectionsByPlatform(platform: "${platform}") {
                id,
                player {
                    id,
                    firstName,
                    lastName,
                    team {
                        id,
                        city,
                        nickname,
                        abbreviation
                    }
                    position,
                    rank,
                    tier,
                    bye
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

export const projectionsByPlayer = (player: number): string => {
    const query = `
        query {
            projectionsByPlayer(player: ${player}) {
                id,
                player { 
                    id,
                    firstName,
                    lastName,
                    team {
                        id,
                        city,
                        nickname,
                        abbreviation
                    }
                    position,
                    rank,
                    tier,
                    bye
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