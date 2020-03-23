import { Resolver, Query, Mutation, Arg, UseMiddleware, Int } from 'type-graphql';
import { Share } from '../../entity';
import { Result } from '../../shared';
import { ShareInput } from './inputs/ShareInput';
import { getRepository } from 'typeorm';
import { isAuth, logger } from '../../middleware';

@Resolver()
export class ShareResolver {
    @UseMiddleware(isAuth, logger)
    @Query(() => [Share])
    async shares(@Arg('userId') userId: string) {
        return getRepository(Share)
            .find({
                relations: ['user', 'note', 'note.user'],
                where: {
                    user: {
                        id: userId
                    }
                }
            });
    }

    @UseMiddleware(isAuth, logger)
    @Query(() => Share)
    async share(@Arg('id') id: string) {
        return getRepository(Share)
            .find({
                relations: ['user', 'note', 'note.user'],
                where: {
                    id
                }
            });
    }

    @UseMiddleware(isAuth, logger)
    @Query(() => Int)
    async sharesCount(@Arg('noteId') noteId: string) {
        return getRepository(Share)
        .count({
            where: {
                note: {
                    id: noteId
                }
            }
        });
    }

    @UseMiddleware(isAuth, logger)
    @Mutation(() => Result)
    async createShare(
        @Arg('input') {
            user,
            note
        }: ShareInput
    ): Promise<Result> {
        const ShareExists = await Share.findOne({
            where: {
                user,
                note
            },
            select: ['id']
        });

        if (ShareExists) {
            return {
                errors: [
                    {
                        path: 'Share',
                        message: 'User has already shared this note!'
                    }
                ]
            }
        }

        await Share.create({
            user,
            note
        }).save();

        return {
            success: [
                {
                    path: 'Share',
                    message: 'Successfully shared this note!'
                }
            ]
        }
    }

    @UseMiddleware(isAuth, logger)
    @Mutation(() => Result)
    async deleteShare(
        @Arg('id') id: string
    ): Promise<Result> {
        const share = await Share.findOne({
            where: {
                id
            },
            select: ['id']
        });

        if (!share) {
            return {
                errors: [
                    {
                        path: 'Share',
                        message: 'User did not share this note!'
                    }
                ]
            }
        }

        await Share.delete({ id });

        return {
            success: [
                {
                    path: 'Share',
                    message: 'Successfully removed share!'
                }
            ]
        }
    }
}