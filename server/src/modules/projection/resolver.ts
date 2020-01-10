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
            const projections = await getRepository(Projection)
                .find({
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
        projection: async (_: any, { player }:
            GQL.IProjectionOnQueryArguments) => {
            const projections = await getRepository(Projection)
                .find({
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
            const players = await getRepository(Player)
                .find({
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
                await Projection.create({
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
                }).save();

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
