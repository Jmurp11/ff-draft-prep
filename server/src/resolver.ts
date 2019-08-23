import { ResolverMap } from "./types/graphql-utils";
import {
    Player,
    Projection,
    Team
} from './entity';
import { getRepository } from "typeorm";

export const resolvers: ResolverMap = {
    Query: {
        teamById: async (_: any, { id }: GQL.ITeamByIdOnQueryArguments) => {
            const team = await Team.find({ where: { id } });

            return team[0];
        },
        teamByAbbreviation: async (_: any, { abbreviation }: GQL.ITeamByAbbreviationOnQueryArguments) => {
            const team = await Team.find({ where: { abbreviation } });

            return team[0];
        },
        teams: async (_: any) => {
            const team = await Team.find();

            return team;
        },
        playerById: async (_: any, { id }: GQL.IPlayerByIdOnQueryArguments) => {
            const playerRepository = await getRepository(Player);
            const player = await playerRepository.find({
                join: {
                    alias: "player",
                    leftJoinAndSelect: {
                        team: "player.team",
                    }
                }, where: { id }
            });
            return player;
        },
        players: async (_: any) => {
            const playerRepository = await getRepository(Player);
            const players = await playerRepository.find({
                join: {
                    alias: "player",
                    leftJoinAndSelect: {
                        team: "player.team",
                    }
                }
            });
            return players;
        },
        projections: async (_: any) => {
            const projectionRepository = await getRepository(Projection);
            const projections = await projectionRepository.find({
                join: {
                    alias: "projection",
                    leftJoinAndSelect: {
                        player: "projection.player",
                        team: "player.team"
                    }
                }
            });
            return projections;
        },
        projectionsByPlayer: async (_: any, { player }:
            GQL.IProjectionsByPlayerOnQueryArguments) => {
            const projectionRepository = await getRepository(Projection);
            const projections = await projectionRepository.find({
                join: {
                    alias: "projection",
                    leftJoinAndSelect: {
                        player: "projection.player",
                        team: "player.team"
                    }
                }, where: { player }
            });
            return projections;
        },
    },
    Mutation: {
        createTeam: async (_: any, {
            city,
            nickname,
            abbreviation,
            bye,
            imageUrl,
            rank,
            passRank,
            rushRank,
            pointsFor,
            yards,
            plays,
            yardsPerPlay,
            turnovers,
            passAttempts,
            passCompletions,
            passYards,
            passTd,
            interception,
            netYardsPerPass,
            rushAttempt,
            rushYards,
            rushTd,
            yardsPerRush,
            scorePercentage,
            turnoverPercentage,
            offensiveLineRank,
            runningBackSoS
        }: GQL.ICreateTeamOnMutationArguments) => {
            const team = Team.create({
                city,
                nickname,
                abbreviation,
                bye,
                imageUrl,
                rank,
                passRank,
                rushRank,
                pointsFor,
                yards,
                plays,
                yardsPerPlay,
                turnovers,
                passAttempts,
                passCompletions,
                passYards,
                passTd,
                interception,
                netYardsPerPass,
                rushAttempt,
                rushYards,
                rushTd,
                yardsPerRush,
                scorePercentage,
                turnoverPercentage,
                offensiveLineRank,
                runningBackSoS
            });

            await team.save();

            return true;
        },
        createPlayer: async (_: any, { firstName, lastName, team, position,
            rank, tier }:
            GQL.ICreatePlayerOnMutationArguments) => {
            const teamQueryResult = await Team.find({ where: { abbreviation: team } });

            const player = Player.create({
                firstName,
                lastName,
                team: teamQueryResult[0].id,
                position,
                rank,
                tier
            });

            await player.save();

            return true;
        },
        addProjection: async (_: any, { firstName, lastName, team, completions, attempts,
            passTd, passYards, interception, carries, rushYards, rushTd, fumbles,
            receptions, receivingYards,
            receivingTd, fantasyPoints }:
            GQL.IAddProjectionOnMutationArguments) => {
            const teamQueryResult = await Team.find({ where: { abbreviation: team } });
            const teamId = teamQueryResult[0].id;
            const playerRepository = await getRepository(Player);
            const players = await playerRepository.find({
                join: {
                    alias: "player",
                    leftJoinAndSelect: {
                        team: "player.team",
                    }
                },
                where: [
                    {
                        team: teamId
                    }
                ]
            });

            let id = 0;

            players.forEach(el => {
                if (el.firstName === firstName && el.lastName === lastName) {
                    id = el.id;
                }
            });

            if (id !== 0) {
                const projection = Projection.create({
                    player: id,
                    completions,
                    attempts,
                    passTd,
                    passYards,
                    interception,
                    carries,
                    rushYards,
                    rushTd,
                    fumbles,
                    receptions,
                    receivingYards,
                    receivingTd,
                    fantasyPoints
                });

                await projection.save();

                return true;
            } else {
                return false;
            }
        }
    }
};