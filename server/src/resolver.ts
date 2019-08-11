import { ResolverMap } from "./types/graphql-utils";
import {
    Player,
    Projection
} from './entity';

export const resolvers: ResolverMap = {
    Query: {
        getPlayerById: async (_: any, { id }: GQL.IGetPlayerByIdOnQueryArguments) => {
            const player = await Player.find({ where: { id } });

            return player;
        },
        getPlayers: async (_: any) => {
            const players = await Player.find();

            return players;
        },
        getProjections: async (_: any) => {
            const projections = await Projection.find();

            return projections;
        },
        getProjectionsByPlatform: async (_: any, { platform }:
            GQL.IGetProjectionsByPlatformOnQueryArguments) => {
            const projections = await Projection.find({ where: { platform } });

            return projections;
        },
        getProjectionsByPlayer: async (_: any, { playerId }:
            GQL.IGetProjectionsByPlayerOnQueryArguments) => {
            const projections = await Projection.find({ where: { playerId } });

            return projections;
        },
    },
    Mutation: {
        createPlayer: async (_: any, { firstName, lastName, team, position }:
            GQL.ICreatePlayerOnMutationArguments) => {
            const player = Player.create({
                firstName,
                lastName,
                team,
                position
            });

            await player.save();

            return true;
        },
        addProjection: async (_: any, { playerId, platform, completions, attempts,
            passTd, passYards, interception, carries, rushYards, rushTd, fumbles,
            targets, receptions, receivingYards,
            receivingTd }:
            GQL.IAddProjectionOnMutationArguments) => {
            const projection = Projection.create({
                playerId,
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