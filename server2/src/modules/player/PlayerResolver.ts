import { Resolver, Query, Mutation, Arg } from 'type-graphql';
import { Player, Team } from '../../entity';
import { Result } from '../../types';
import { PlayerInput } from './inputs/PlayerInput';

@Resolver()
export class PlayerResolver {
    @Query(() => [Player])
    async players() {
        return Player.find();
    }

    @Query(() => Player)
    async player(@Arg('id') id: string) {
        return Player.findOne({
            where: {
                id
            }
        });
    }

    @Mutation(() => Result)
    async createPlayer(
        @Arg('input') {
            firstName,
            lastName,
            team,
            position,
            rank,
            adp,
            tier
        }: PlayerInput
    ): Promise<Result> {
        const playerExists = await Player.findOne({
            where: { firstName, lastName, team, position },
            select: ["id"]
        });

        if (playerExists) {
            return {
                errors: [
                    {
                        path: 'player',
                        message: 'Player already exists!'
                    }
                ]
            };
        }
        const teamQueryResult = await Team.findOne({
            where: { abbreviation: team }
        });
        
        await Player.create({
            firstName,
            lastName,
            team: teamQueryResult!.id,
            position,
            rank,
            adp,
            tier
        }).save();

        return {
            success: [
                {
                    path: 'player',
                    message: 'Successfully added player!'
                }
            ]
        }
    }
}