import { ResolverMap } from "./../../types/graphql-utils";
import {
    Player,
    Team
} from './../../entity';
import { getRepository } from "typeorm";
import { playerAlreadyExists } from "./errorMessages";

export const resolvers: ResolverMap = {
    Query: {
        playerById: async (_: any, { id }: GQL.IPlayerByIdOnQueryArguments) => {
            const player = await getRepository(Player)
                .find({
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
            const players = await getRepository(Player)
                .find({
                    join: {
                        alias: "player",
                        leftJoinAndSelect: {
                            team: "player.team",
                        }
                    }
                });
            return players;
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
            const teamQueryResult = await Team.find({ where: { abbreviation: team } });

            await Player.create({
                firstName,
                lastName,
                team: teamQueryResult[0].id,
                position,
                rank,
                adp,
                tier
            }).save();

            return true;
        }
    }
};
