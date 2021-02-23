import { Resolver, Query, Mutation, Arg, UseMiddleware, Int, Ctx } from 'type-graphql';
import { Note } from '../../entity/Note';
import { Result, MyContext } from '../../shared';
import { NoteInput } from './inputs/NoteInput';
import { getRepository, SelectQueryBuilder } from 'typeorm';
import { isAuth, logger } from '../../middleware';
import { DeleteNoteInput } from './inputs/DeleteNoteInput';
import { filterQuery } from '../../utils/filterQuery';
import { NoteArgs } from './inputs/NoteArgs';
import { NoteService } from './services/note-service';
import { Folder } from '../../entity/Folder';

@Resolver()
export class NoteResolver {
    constructor(
        private _notes: NoteService
    ) { }

    @UseMiddleware(isAuth, logger)
    @Query(() => [Note])
    async notes(
        @Arg('input') {
            filterType,
            id,
            user,
            player,
            folder,
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
            .leftJoinAndSelect('notes.folder', 'folder')
            .leftJoinAndSelect('player.team', 'team')
            .take(take)
            .skip(skip)
            .orderBy('notes.creationTime', 'DESC')

        switch (filterType) {
            case 'byCurrentUser':
                if (ctx.payload?.userId) {
                    where = await this._notes.byCurrentUser(ctx);
                    return filterQuery(query, where).getMany();
                }
                return [];
            case 'byCurrentUserAndNoFolder':
                if (ctx.payload?.userId) {
                    where = await this._notes.byCurrentUserAndNoFolder(ctx);
                    return filterQuery(query, where).getMany();
                }
                return [];
            case 'byFolder':
                where = await this._notes.byFolder(folder);
                return filterQuery(query, where).getMany();
            case 'byId':
                where = await this._notes.byId(id);
                return filterQuery(query, where).getMany();
            case 'byUser':
                where = await this._notes.byUser(user);
                return filterQuery(query, where).getMany();
            case 'byPlayer':
                where = await this._notes.byPlayer(player);
                return filterQuery(query, where).getMany();
            case 'byUserAndPlayer':
                where = await this._notes.byUserAndPlayer(user, player);
                return filterQuery(query, where).getMany();
            default:
                return query.getMany()
        }
    }

    @UseMiddleware(isAuth, logger)
    @Query(() => Note)
    async note(
        @Arg('input') {
            id
        }: NoteArgs
    ) {
        let where;

        const query: SelectQueryBuilder<Note> = getRepository(Note)
            .createQueryBuilder('notes')
            .leftJoinAndSelect('notes.user', 'user')
            .leftJoinAndSelect('notes.player', 'player')
            .leftJoinAndSelect('notes.folder', 'folder')
            .leftJoinAndSelect('player.team', 'team');

        where = await this._notes.byId(id);
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
            folder,
            title,
            body,
            isPrivate
        }: NoteInput
    ): Promise<Result> {
        const user = ctx.payload?.userId;

        const titleExists = await Note.findOne({
            where: {
                user,
                folder,
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
        const updatedTime = new Date().toISOString();

        await Note.create({
            user,
            player,
            folder,
            creationTime,
            updatedTime,
            title,
            body,
            isPrivate
        }).save();

        if (folder) {
            await Folder.update({ id: folder }, {
                updatedTime
            });
        }

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
    async editNote(
        @Ctx() ctx: MyContext,
        @Arg('input') {
            id,
            folder,
            title,
            body,
            isPrivate
        }: NoteInput
    ): Promise<Result> {
        const user = ctx.payload?.userId;

        const note = await Note.findOne({
            where: {
                id
            }
        });

        if (note?.user !== user) {
            return {
                errors: [
                    {
                        path: 'note',
                        message: 'This user cannot edit this note!'
                    }
                ]
            }
        }

        if (!note) {
            return {
                errors: [
                    {
                        path: 'note',
                        message: 'This note no longer exists!'
                    }
                ]
            }
        }

        const updatedTime = new Date().toISOString();


        await Note.update({ id },
            {
                folder,
                title,
                body,
                updatedTime,
                isPrivate
            });

        if (folder) {
            await Folder.update({ id: folder }, {
                updatedTime
            });
        }

        return {
            success: [
                {
                    path: 'note',
                    message: 'Successfully updated note!'
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
            select: ['id', 'user', 'folder']
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

        if (note!.folder) {
            const updatedTime = new Date().toISOString();

            await Folder.update({ id: note!.folder }, {
                updatedTime
            });
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