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
            console.log(`PLAYER: ${JSON.stringify(player)}`);
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
            console.log(JSON.stringify(players));
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
            console.log(JSON.stringify(projections));
            return projections;
        },
        projectionsByPlatform: async (_: any, { platform }:
            GQL.IProjectionsByPlatformOnQueryArguments) => {
            const projectionRepository = await getRepository(Projection);
            const projections = await projectionRepository.find({
                join: {
                    alias: "projection",
                    leftJoinAndSelect: {
                        player: "projection.player",
                        team: "player.team"
                    }
                }, where: { platform }
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
            turnoverPercentage
        }: GQL.ICreateTeamOnMutationArguments) => {
            const team = Team.create({
                city,
                nickname,
                abbreviation,
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
                turnoverPercentage
            });

            await team.save();

            return true;
        },
        createPlayer: async (_: any, { firstName, lastName, team, position,
            rank, tier, bye }:
            GQL.ICreatePlayerOnMutationArguments) => {
            const player = Player.create({
                firstName,
                lastName,
                team,
                position,
                rank,
                tier,
                bye
            });

            await player.save();

            return true;
        },
        addProjection: async (_: any, { player, platform, completions, attempts,
            passTd, passYards, interception, carries, rushYards, rushTd, fumbles,
            targets, receptions, receivingYards,
            receivingTd }:
            GQL.IAddProjectionOnMutationArguments) => {
            const projection = Projection.create({
                player,
                platform,
                completions,
                attempts,
                passTd,
                passYards,
                interception,
                carries,
                rushYards,
                rushTd,
                fumbles,
                targets,
                receptions,
                receivingYards,
                receivingTd
            });

            await projection.save();

            return true;
        }
    }
};