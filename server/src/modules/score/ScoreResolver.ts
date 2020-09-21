import { Resolver, Query, Mutation, Arg, UseMiddleware, Int, PubSub, PubSubEngine } from 'type-graphql';
import { Score, Note } from '../../entity';
import { Result } from '../../shared';
import { ScoreInput } from './inputs/ScoreInput';
import { getRepository } from 'typeorm';
import { isAuth, logger } from '../../middleware';


const NOTIFICATION = 'NOTIFICATION';

@Resolver()
export class ScoreResolver {
    @UseMiddleware(isAuth, logger)
    @Query(() => [Score])
    async scores(@Arg('user') user: string) {
        return getRepository(Score)
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
    @Query(() => Score)
    async score(@Arg('id') id: string) {
        return getRepository(Score)
            .find({
                relations: ['user', 'note', 'note.user'],
                where: {
                    id
                }
            });
    }

    @UseMiddleware(isAuth, logger)
    @Query(() => Int)
    async totalScores(@Arg('noteId') noteId: string) {
        return getRepository(Score)
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
    async noteScore(@Arg('noteId') noteId: string) {
        const positive = await getRepository(Score)
            .find({
                where: {
                    id: noteId,
                    response: true
                }
            });

        const negative = await getRepository(Score)
            .find({
                where: {
                    id: noteId,
                    response: false
                }
            });

    
        return positive.length - negative.length;
    }

    @UseMiddleware(isAuth, logger)
    @Query(() => Int)
    async userScoresCount(@Arg('user') user: string) {
        return getRepository(Score)
            .count({
                where: {
                    user
                }
            });
    }

    @UseMiddleware(isAuth, logger)
    @Query(() => Int)
    async userGeneratedScoresCount(@Arg('user') user: string) {
        return getRepository(Score)
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
    async addScore(
        @PubSub() pubSub: PubSubEngine,
        @Arg('input') {
            user,
            note,
            response
        }: ScoreInput
    ): Promise<Result> {
        const scoreExists = await Score.findOne({
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

        if (scoreExists) {
            return {
                errors: [
                    {
                        path: 'Score',
                        message: 'User has already scored this note!'
                    }
                ]
            }
        }

        await Score.create({
            user,
            note,
            response,
            creationTime: n?.creationTime
        }).save();

        const payload = {
            user,
            note,
            response,
            type: 'score'
        };

        await pubSub.publish(NOTIFICATION, payload);

        return {
            success: [
                {
                    path: 'Score',
                    message: 'Successfully scored this note!'
                }
            ]
        }
    }
}