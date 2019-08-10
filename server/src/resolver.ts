import { ResolverMap } from "./types/graphql-utils";
import { Player, 
    Projection } from './entity';

export const resolvers: ResolverMap = {
    Query: {
        hello: (_: any, { name }: GQL.IHelloOnQueryArguments) => `Hello ${name || 'World'}`,
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