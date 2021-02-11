import { Resolver, Query, Mutation, Arg, UseMiddleware, Int, Ctx } from 'type-graphql';
import { Folder } from '../../entity/Folder';
import { Result, MyContext } from '../../shared';
import { getRepository, SelectQueryBuilder } from 'typeorm';
import { isAuth, logger } from '../../middleware';
import { filterQuery } from '../../utils/filterQuery';
import { FolderArgs } from './inputs/FolderArgs';
import { FolderService } from './services/folder.service';

@Resolver()
export class FolderResolver {
    constructor(
        private _folder: FolderService
    ) { }

    @UseMiddleware(isAuth, logger)
    @Query(() => [Folder])
    async folders(
        @Arg('input') {
            filterType,
            user,
            id,
            name,
            skip,
            take
        }: FolderArgs,
        @Ctx() ctx: MyContext
    ) {
        let where;
        const query: SelectQueryBuilder<Folder> = getRepository(Folder)
            .createQueryBuilder('folders')
            .leftJoinAndSelect('folders.user', 'user')
            .leftJoinAndSelect('folders.notes', 'folder')
            .take(take)
            .skip(skip)
            .orderBy('folders.creationTime', 'DESC')

        switch (filterType) {
            case 'byCurrentUser':
                if (ctx.payload?.userId) {
                    where = await this._folder.byCurrentUser(ctx);
                    return filterQuery(query, where).getMany();
                }
                return [];
            case 'byUser':
                where = await this._folder.byUser(user);
                return filterQuery(query, where).getMany();
            case 'byId':
                where = await this._folder.byId(id);
                return filterQuery(query, where).getMany();
            case 'byName':
                where = await this._folder.byName(name);
                return filterQuery(query, where).getMany();
            default:
                return query.getMany()
        }
    }

    @UseMiddleware(isAuth, logger)
    @Query(() => Folder)
    async folder(
        @Arg('input') {
            filterType,
            id,
            skip,
            take
        }: FolderArgs
    ) {
        let where;
        const query: SelectQueryBuilder<Folder> = getRepository(Folder)
            .createQueryBuilder('notes')
            .leftJoinAndSelect('notes.user', 'user')
            .leftJoinAndSelect('folder.notes', 'folder')
            .leftJoinAndSelect('notes.player', 'player')
            .leftJoinAndSelect('player.team', 'team')
            .take(take)
            .skip(skip)
            .orderBy('notes.creationTime', 'DESC')

        switch (filterType) {
            case 'byId':
                where = await this._folder.byId(id);
                return filterQuery(query, where).getOne();
            default:
                return query.getOne()
        }
    }

    @UseMiddleware(isAuth, logger)
    @Query(() => Int)
    async folderCount(@Arg('user') user: string) {
        return getRepository(Folder)
            .count({
                where: {
                    user
                }
            });
    }

    @UseMiddleware(isAuth, logger)
    @Mutation(() => Result)
    async createFolder(
        @Ctx() ctx: MyContext,
        @Arg('input') {
            name
        }: FolderArgs
    ): Promise<Result> {
        const user = ctx.payload?.userId;

        const titleExists = await Folder.findOne({
            where: {
                user,
                name
            },
            select: ['id']
        });

        if (titleExists) {
            return {
                errors: [
                    {
                        path: 'folder',
                        message: 'User has already created folder with this name!'
                    }
                ]
            }
        }

        const creationTime = new Date().toISOString();

        await Folder.create({
            user,
            name,
            creationTime
        }).save();

        return {
            success: [
                {
                    path: 'folder',
                    message: 'Successfully added folder!'
                }
            ]
        }
    }

    @UseMiddleware(isAuth, logger)
    @Mutation(() => Result)
    async deleteFolder(
        @Ctx() ctx: MyContext,
        @Arg('input') {
            id
        }: FolderArgs
    ): Promise<Result> {
        const folder = await Folder.findOne({
            where: {
                id
            },
            select: ['id', 'user']
        });

        if (!folder!.id) {
            return {
                errors: [
                    {
                        path: 'folder',
                        message: 'Folder does not exist!'
                    }
                ]
            }
        }

        if (folder!.user !== ctx.payload?.userId) {
            return {
                errors: [
                    {
                        path: 'folder',
                        message: 'User did not create this folder!'
                    }
                ]
            }
        }

        await Folder.delete({ id });

        return {
            success: [
                {
                    path: 'folder',
                    message: 'Successfully deleted folder!'
                }
            ]
        }
    }
}