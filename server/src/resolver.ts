import { ResolverMap } from "./types/graphql-utils";
import {
    Player,
    Projection
} from './entity';

export const resolvers: ResolverMap = {
    Query: {
        playerById: async (_: any, { id }: GQL.IPlayerByIdOnQueryArguments) => {
            const player = await Player.find({ where: { id } });

            return player;
        },
        players: async (_: any) => {
            const players = await Player.find();

            return players;
        },
        projections: async (_: any) => {
            const projections = await Projection.find();

            return projections;
        },
        projectionsByPlatform: async (_: any, { platform }:
            GQL.IProjectionsByPlatformOnQueryArguments) => {
            const projections = await Projection.find({ where: { platform } });

            return projections;
        },
        projectionsByPlayer: async (_: any, { player }:
            GQL.IProjectionsByPlayerOnQueryArguments) => {
            const projections = await Projection.find({ where: { player } });

            return projections;
        },
    },
    Mutation: {
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