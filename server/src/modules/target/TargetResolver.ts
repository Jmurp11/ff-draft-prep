import { Resolver, Query, Mutation, Arg, UseMiddleware, Float } from 'type-graphql';
import { Target } from '../../entity';
import { Result } from '../../shared';
import { TargetInput } from './inputs/TargetInput';
import { getRepository } from 'typeorm';
import { isAuth, logger } from '../../middleware';
import { TargetByPlayerUserInput } from './inputs/TargetByPlayerUserInput';

@Resolver()
export class TargetResolver {
    @UseMiddleware(isAuth, logger)
    @Query(() => [Target])
    async targets(@Arg('user') user: string) {
        return getRepository(Target)
            .find({
                relations: ['user', 'player'],
                where: {
                    user
                },
                order: {
                    round: 'ASC'
                }
            });
    }

    @UseMiddleware(isAuth, logger)
    @Query(() => Target)
    async target(@Arg('id') id: string) {
        return getRepository(Target)
            .findOne({
                relations: ['user', 'player'],
                where: { id }
            });
    }

    @UseMiddleware(isAuth, logger)
    @Query(() => Target)
    async targetByPlayerUser(
        @Arg('input') {
            user,
            player
        }:TargetByPlayerUserInput
    ) {
        return getRepository(Target)
            .findOne({
                relations: ['user', 'player'],
                where: { user, player }
            });
    }

    @UseMiddleware(isAuth, logger)
    @Query(() => Float, { nullable: true })
    async avgTargetRound(@Arg('player') player: string) {
        let sum = 0;

        const countTargeted = await getRepository(Target)
            .findAndCount({
                relations: ['player'],
                where: { player }
            });
        countTargeted[0].forEach(el => sum = sum + el.round);

        return sum / countTargeted[1];
    }


    @UseMiddleware(isAuth, logger)
    @Mutation(() => Result)
    async createTarget(
        @Arg('input') {
            user,
            player,
            round
        }: TargetInput
    ): Promise<Result> {
        const targetExists = await Target.findOne({
            where: { user, player },
            select: ["id"]
        });

        if (targetExists) {
            return {
                errors: [
                    {
                        path: 'target',
                        message: 'Target round for this player already exists!  Remove it before trying again.'
                    }
                ]
            };
        }

        await Target.create({
            user,
            player,
            round
        }).save();

        return {
            success: [
                {
                    path: 'target',
                    message: 'Successfully added target!'
                }
            ]
        }
    }

    @UseMiddleware(isAuth, logger)
    @Mutation(() => Result)
    async deleteTarget(
        @Arg('id') id: string
    ): Promise<Result> {
        const target = await Target.findOne({
            where: { id },
            select: ["id"]
        });

        if (!target) {
            return {
                errors: [
                    {
                        path: 'target',
                        message: 'This target does not exist!'
                    }
                ]
            };
        }

        await Target.delete({ id });

        return {
            success: [
                {
                    path: 'target',
                    message: 'Successfully deleted target!'
                }
            ]
        }
    }
}