import { ResolverMap } from "./../../types/graphql-utils";
import {
    Player,
    Projection,
    Team
} from './../../entity';
import { getRepository } from "typeorm";
import { projectionAlreadyExists } from "./errorMessages";

export const resolvers: ResolverMap = {
    Query: {
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

                return null;
            } else {
                return [
                    {
                        path: "projection",
                        message: projectionAlreadyExists
                    }
                ];
            }
        }
    }
};