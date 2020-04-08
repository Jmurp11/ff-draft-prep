import { Resolver, Query, Mutation, Arg } from 'type-graphql';
import { Player } from '../../entity';
import { Result } from '../../shared';
import { PlayerInput } from './inputs/PlayerInput';
import { getRepository } from 'typeorm';

@Resolver()
export class PlayerResolver {
    @Query(() => [Player])
    async players(@Arg('user', { nullable: true }) user: string) {
        if (user) {
            return getRepository(Player)
                .find({
                    relations: [
                        'team',
                        'projection',
                        'rank',
                        'defaultRank',
                        'notes',
                        'notes.user',
                        'notes.likes'
                    ],
                    where: {
                        rank: {
                            user: user
                        }
                    },
                    order: {
                        lastName: 'ASC'
                    }
                });
        } else {
            return getRepository(Player)
                .find({
                    relations: [
                        'team',
                        'projection',
                        'rank',
                        'defaultRank',
                        'notes',
                        'notes.user',
                        'notes.likes'
                    ],
                    order: {
                        lastName: 'ASC'
                    }
                });
        }
    }

    @Query(() => Player)
    async player(@Arg('id') id: string) {
        return getRepository(Player)
            .findOne({
                relations: [
                    'team',
                    'projection',
                    'rank',
                    'defaultRank',
                    'notes',
                    'notes.user',
                    'notes.likes'
                ],
                where: { id }
            });
    }

    @Mutation(() => Result)
    async createPlayer(
        @Arg('input') {
            firstName,
            lastName,
            team,
            position,
            depthChartPos
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

        await Player.create({
            firstName,
            lastName,
            team,
            position,
            depthChartPos
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