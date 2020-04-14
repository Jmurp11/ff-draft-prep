import { Resolver, Query, Mutation, Arg, UseMiddleware } from 'type-graphql';
import { Note } from '../../entity';
import { Result } from '../../shared';
import { NoteInput } from './inputs';
import { getRepository } from 'typeorm';
import { isAuth, logger } from '../../middleware';
import { DeleteNoteInput } from './inputs/DeleteNoteInput';
import { NotesByPlayerUserInput } from './inputs/NotesByPlayerUserInput';

@Resolver()
export class NoteResolver {
    @UseMiddleware(isAuth, logger)
    @Query(() => [Note])
    async notes(
        @Arg('user', { nullable: true }) user: string) {
        if (user) {
            return getRepository(Note)
                .find({
                    relations: ['user', 'player', 'likes', 'shares'],
                    where: {
                        user
                    },
                    order: {
                        creationTime: 'DESC'
                    }
                });
        } else {
            return getRepository(Note)
                .find({
                    relations: ['user', 'player', 'likes', 'shares'],
                    where: {
                        isPrivate: false
                    },
                    order: {
                        creationTime: 'DESC'
                    }
                });
        }
    }

    @UseMiddleware(isAuth, logger)
    @Query(() => [Note])
    async notesByPlayer(
        @Arg('player') player: string) {
        return getRepository(Note)
            .find({
                relations: ['user', 'player', 'likes', 'shares'],
                where: {
                    player
                },
                order: {
                    creationTime: 'DESC'
                }
            });
    }

    @UseMiddleware(isAuth, logger)
    @Query(() => [Note])
    async notesByPlayerUser(
        @Arg('input') {
            player,
            user
        }: NotesByPlayerUserInput) {
        return getRepository(Note)
            .find({
                relations: ['user', 'player', 'likes', 'shares'],
                where: {
                    player, user
                },
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
                relations: ['user', 'player', 'likes', 'shares'],
                where: { id },
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
            isPrivate
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
        @Arg('input') {
            id,
            user
        }: DeleteNoteInput
    ): Promise<Result> {
        const note = await Note.findOne({
            where: {
                id
            },
            select: ['id', 'user']
        });

        if (!note!.id) {
            return {
                errors: [
                    {
                        path: 'note',
                        message: 'Note does not exist!'
                    }
                ]
            }
        }

        if (note!.user !== user) {
            console.log(note);
            console.log(note!.user, user);
            return {
                errors: [
                    {
                        path: 'note',
                        message: 'User did not create this note!'
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