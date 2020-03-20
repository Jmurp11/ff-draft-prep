import { Resolver, Query, Mutation, Arg, UseMiddleware, Int } from 'type-graphql';
import { Like } from '../../entity';
import { Result } from '../../shared';
import { LikeInput } from './inputs/LikeInput';
import { getRepository } from 'typeorm';
import { isAuth, logger } from '../../middleware';

@Resolver()
export class LikeResolver {
    @UseMiddleware(isAuth, logger)
    @Query(() => [Like])
    async likes(@Arg('userId') userId: string) {
        return getRepository(Like)
            .find({
                relations: ['user', 'note'],
                where: {
                    user: {
                        id: userId
                    }
                }
            });
    }

    @UseMiddleware(isAuth, logger)
    @Query(() => Like)
    async like(@Arg('id') id: string) {
        return getRepository(Like)
            .find({
                relations: ['user', 'note'],
                where: {
                    id
                }
            });
    }

    @UseMiddleware(isAuth, logger)
    @Query(() => Int)
    async likesCount(@Arg('noteId') noteId: string) {
        const likes = await getRepository(Like)
            .find({
                relations: ['user', 'note'],
                where: {
                    note: {
                        id: noteId
                    }
                }
            });
        
        return likes.length;
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
            note
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