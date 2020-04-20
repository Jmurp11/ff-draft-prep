import { Resolver, Query, Mutation, Arg, UseMiddleware, Int } from 'type-graphql';
import { Like, Note } from '../../entity';
import { Result } from '../../shared';
import { LikeInput } from './inputs/LikeInput';
import { getRepository } from 'typeorm';
import { isAuth, logger } from '../../middleware';

@Resolver()
export class LikeResolver {
    @UseMiddleware(isAuth, logger)
    @Query(() => [Like])
    async likes(@Arg('user') user: string) {
        return getRepository(Like)
            .find({
                relations: ['user', 'note', 'note.user'],
                where: {
                    user: {
                        id: user
                    }
                },
                order: {
                    creationTime: 'DESC'
                }
            });
    }

    @UseMiddleware(isAuth, logger)
    @Query(() => Like)
    async like(@Arg('id') id: string) {
        return getRepository(Like)
            .find({
                relations: ['user', 'note', 'note.user'],
                where: {
                    id
                }
            });
    }

    @UseMiddleware(isAuth, logger)
    @Query(() => Int)
    async likesCount(@Arg('noteId') noteId: string) {
        return getRepository(Like)
            .count({
                where: {
                    note: {
                        id: noteId
                    }
                }
            });
    }

    @UseMiddleware(isAuth, logger)
    @Query(() => Int)
    async userLikesCount(@Arg('user') user: string) {
        return getRepository(Like)
            .count({
                where: {
                    user
                }
            });
    }

    @UseMiddleware(isAuth, logger)
    @Query(() => Int)
    async userGeneratedLikesCount(@Arg('user') user: string) {
        return getRepository(Like)
            .count({
                relations: ['note', 'note.user'],
                where: {
                    note: {
                        user
                    }
                }
            });
    }

    @UseMiddleware(isAuth, logger)
    @Mutation(() => Result)
    async addLike(
        @Arg('input') {
            user,
            note
        }: LikeInput
    ): Promise<Result> {
        const likeExists = await Like.findOne({
            where: {
                user,
                note
            },
            select: ['id']
        });

        const n = await Note.findOne({
            where: {
                id: note
            }
        });

        if (likeExists) {
            return {
                errors: [
                    {
                        path: 'Like',
                        message: 'User has already liked this note!'
                    }
                ]
            }
        }

        await Like.create({
            user,
            note,
            creationTime: n?.creationTime
        }).save();

        return {
            success: [
                {
                    path: 'Like',
                    message: 'Successfully liked this note!'
                }
            ]
        }
    }

    @UseMiddleware(isAuth, logger)
    @Mutation(() => Result)
    async deleteLike(
        @Arg('id') id: string
    ): Promise<Result> {
        const like = await Like.findOne({
            where: {
                id
            },
            select: ['id']
        });

        if (!like) {
            return {
                errors: [
                    {
                        path: 'Like',
                        message: 'User did not like this note!'
                    }
                ]
            }
        }

        await Like.delete({ id });

        return {
            success: [
                {
                    path: 'Like',
                    message: 'Successfully removed like!'
                }
            ]
        }
    }
}