import { Resolver, Query, Mutation, Arg, UseMiddleware } from 'type-graphql';
import { Note } from '../../entity';
import { Result } from '../../types';
import { NoteInput } from './inputs/NoteInput';
import { getRepository } from 'typeorm';
import { isAuth, logger } from '../../middleware';

@Resolver()
export class NoteResolver {
    @UseMiddleware(isAuth, logger)
    @Query(() => [Note])
    async note() {
        return getRepository(Note)
            .find({
                join: {
                    alias: "note",
                    leftJoinAndSelect: {
                        user: "note.user",
                        player: "note.player",
                    }
                }
            });
    }

    @UseMiddleware(isAuth, logger)
    @Query(() => Note)
    async notes(@Arg('id') id: string) {
        return getRepository(Note)
            .findOne({
                join: {
                    alias: "note",
                    leftJoinAndSelect: {
                        user: "note.user",
                        player: "note.player",
                    }
                }, where: { id }
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
}