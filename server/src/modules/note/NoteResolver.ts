import { Resolver, Query, Mutation, Arg, UseMiddleware } from 'type-graphql';
import { Note } from '../../entity';
import { Result } from '../../shared';
import { NoteInput } from './inputs';
import { getRepository } from 'typeorm';
import { isAuth, logger } from '../../middleware';

@Resolver()
export class NoteResolver {
    @UseMiddleware(isAuth, logger)
    @Query(() => [Note])
    async notes() {
        return getRepository(Note)
            .find({
                relations: ['user', 'player'],
                order: {
                    creationTime: 'DESC'
                }
            });
    }

    @UseMiddleware(isAuth, logger)
    @Query(() => Note)
    async note(@Arg('id') id: string) {
        return getRepository(Note)
            .findOne({
                relations: ['user', 'player'],
                where: { id },
                order: {
                    creationTime: 'DESC'
                }
            });
    }

    @UseMiddleware(logger)
    @Query(() => [Note])
    async publicNotes() {
        return getRepository(Note)
            .find({
                relations: ['user', 'player'],
                where: {
                    isPrivate: false
                },
                order: {
                    creationTime: 'DESC'
                }
            });
    }


    @UseMiddleware(isAuth, logger)
    @Query(() => [Note])
    async userNotes(@Arg('user') user: string) {
        return getRepository(Note)
            .find({
                relations: ['user', 'player'],
                where: {
                    user
                },
                order: {
                    creationTime: 'DESC'
                }
            });
    }

    @UseMiddleware(isAuth, logger)
    @Mutation(() => Result)
    async createNote(
        @Arg('input') {
            user,
            player,
            title,
            body,
            source,
            isPrivate
        }: NoteInput
    ): Promise<Result> {
        const likes = 0;
        const shares = 0;

        const titleExists = await Note.findOne({
            where: {
                user,
                player,
                title
            },
            select: ['id']
        });

        if (titleExists) {
            return {
                errors: [
                    {
                        path: 'note',
                        message: 'User has already created note with this title for this player!'
                    }
                ]
            }
        }

        const creationTime = new Date().toISOString();

        await Note.create({
            user,
            player,
            creationTime,
            title,
            body,
            source,
            isPrivate,
            likes,
            shares
        }).save();

        return {
            success: [
                {
                    path: 'note',
                    message: 'Successfully added note!'
                }
            ]
        }
    }

    @UseMiddleware(isAuth, logger)
    @Mutation(() => Result)
    async deleteNote(
        @Arg('id') id: string
    ): Promise<Result> {
        const note = await Note.findOne({
            where: {
                id
            },
            select: ['id']
        });

        if (!note) {
            return {
                errors: [
                    {
                        path: 'note',
                        message: 'Note does not exist!'
                    }
                ]
            }
        }

        await Note.delete({ id });

        return {
            success: [
                {
                    path: 'note',
                    message: 'Successfully deleted note!'
                }
            ]
        }
    }
}