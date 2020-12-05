import { Resolver, Query, Mutation, Arg, UseMiddleware, Int, Ctx } from 'type-graphql';
import { Note } from '../../entity';
import { Result, MyContext } from '../../shared';
import { NoteInput } from './inputs/NoteInput';
import { getRepository, SelectQueryBuilder } from 'typeorm';
import { isAuth, logger } from '../../middleware';
import { DeleteNoteInput } from './inputs/DeleteNoteInput';
import { filterQuery } from '../../utils/filterQuery';
import { NoteArgs } from './inputs/NoteArgs';
import { NoteService } from './services/note-service';

@Resolver()
export class NoteResolver {
    constructor(
        private _notes: NoteService
    ) { }

    @UseMiddleware(logger)
    @Query(() => [Note])
    async notes(
        @Arg('input') {
            filterType,
            user,
            player,
            skip,
            take
        }: NoteArgs,
        @Ctx() ctx: MyContext
    ) {
        let where;
        const query: SelectQueryBuilder<Note> = getRepository(Note)
            .createQueryBuilder('notes')
            .leftJoinAndSelect('notes.user', 'user')
            .leftJoinAndSelect('notes.player', 'player')
            .leftJoinAndSelect('player.team', 'team')
            .take(take)
            .skip(skip)
            .orderBy('notes.creationTime', 'DESC')

        switch (filterType) {
            case 'byCurrentUser':
                where = await this._notes.byCurrentUser(ctx);
                return filterQuery(query, where).getMany();
            case 'byUser':
                where = await this._notes.byUser(user);
                return filterQuery(query, where).getMany();
            case 'byPlayer':
                console.log(player);
                where = await this._notes.byPlayer(player);
                return filterQuery(query, where).getMany();
            default:
                return query.getMany()
        }
    }

    @UseMiddleware(isAuth, logger)
    @Query(() => Note)
    async note(
        @Arg('input') {
            user,
            player
        }: NoteArgs
    ) {
        let where;

        const query: SelectQueryBuilder<Note> = getRepository(Note)
            .createQueryBuilder('notes')
            .leftJoinAndSelect('notes.user', 'user')
            .leftJoinAndSelect('notes.player', 'player')
            .leftJoinAndSelect('player.team', 'team');

        where = await this._notes.byUserAndPlayer(user, player);
        return filterQuery(query, where).getOne();
    }

    @UseMiddleware(isAuth, logger)
    @Query(() => Int)
    async noteCount(@Arg('user') user: string) {
        return getRepository(Note)
            .count({
                where: {
                    user
                }
            });
    }

    @UseMiddleware(isAuth, logger)
    @Mutation(() => Result)
    async createNote(
        @Ctx() ctx: MyContext,
        @Arg('input') {
            player,
            title,
            body,
            isPrivate
        }: NoteInput
    ): Promise<Result> {
        const user = ctx.payload?.userId;

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
        @Ctx() ctx: MyContext,
        @Arg('input') {
            id
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

        if (note!.user !== ctx.payload?.userId) {
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