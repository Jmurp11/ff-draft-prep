import { ResolverMap } from "./../../types/graphql-utils";
import {
    Player,
    Team
} from './../../entity';
import { getRepository } from "typeorm";
import { playerAlreadyExists } from "./errorMessages";

export const resolvers: ResolverMap = {
    Query: {
        player: async (_: any, { id }: GQL.IPlayerOnQueryArguments) => {
            return getRepository(Player)
                .find({
                    join: {
                        alias: "player",
                        leftJoinAndSelect: {
                            team: "player.team",
                        }
                    }, where: { id }
                });
        },
        players: async (_: any) => {
            return getRepository(Player)
                .find({
                    join: {
                        alias: "player",
                        leftJoinAndSelect: {
                            team: "player.team",
                        }
                    }
                });
        }
    },
    Mutation: {
        createPlayer: async (_: any, { firstName, lastName, team, position,
            rank, adp, tier }:
            GQL.ICreatePlayerOnMutationArguments) => {
            const playerExists = await Player.findOne({
                where: { firstName, lastName, team, position },
                select: ["id"]
            });

            if (playerExists) {
                return [
                    {
                        path: "team",
                        message: playerAlreadyExists
                    }
                ];
            }
            const teamQueryResult = await Team.findOne({
                where: { abbreviation: team }
            });

            if (teamQueryResult) {
                await Player.create({
                    firstName,
                    lastName,
                    team: teamQueryResult.id,
                    position,
                    rank,
                    adp,
                    tier
                }).save();

                return true;
            }

            return false;
        }
    }
};
