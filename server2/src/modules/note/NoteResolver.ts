import { Resolver, Query, Mutation, Arg } from 'type-graphql';
import { Note } from '../../entity';
import { Result } from '../../types';
import { NoteInput } from './inputs/NoteInput';
import { getRepository } from 'typeorm';

@Resolver()
export class NoteResolver {
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

    @Mutation(() => Result)
    async createNote(
        @Arg('input') {
            user,
            player,
            date,
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

        await Note.create({
            user,
            player,
            date,
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