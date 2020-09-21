import { Resolver, Query, Mutation, Arg, UseMiddleware } from 'type-graphql';
import { DraftPickService } from "./services/draft-pick-service";
import { logger } from "../../middleware";
import { DraftPick, Player, User, Draft } from "../../entity";
import { DraftPickArgs } from "./inputs/DraftPickArgs";
import { SelectQueryBuilder, getRepository } from "typeorm";
import { filterQuery } from "../../utils/filterQuery";
import { Result } from '../../shared';

@Resolver()
export class DraftPickPickResolver {
    constructor(
        private _draftPick: DraftPickService
    ) { }

    @UseMiddleware(logger)
    @Query(() => [DraftPick])
    async draftPicks(
        @Arg('input', { nullable: true }) {
            filterType,
            draft,
            player,
            user,
            take,
            skip
        }: DraftPickArgs
    ): Promise<DraftPick[] | undefined> {
        let where;

        const query: SelectQueryBuilder<DraftPick> = getRepository(DraftPick)
            .createQueryBuilder('draftPicks')
            .leftJoinAndSelect('draftPicks.user', 'user')
            .leftJoinAndSelect('draftPicks.draft', 'draft')
            .leftJoinAndSelect('draftPicks.player', 'player')
            .take(take)
            .skip(skip)
            .orderBy('DraftPicks.creationTime', 'DESC')

        switch (filterType) {
            case 'byDraft':
                where = await this._draftPick.byDraft(draft);
                return filterQuery(query, where).getMany();
            case 'byUser':
                where = await this._draftPick.byUser(user);
                return filterQuery(query, where).getMany();
            case 'byPlayer':
                where = await this._draftPick.byPlayer(player);
                return filterQuery(query, where).getMany();
            default:
                return query.getMany()
        }
    }

    @UseMiddleware(logger)
    @Query(() => DraftPick)
    async draftPick(@Arg('input') {
        filterType,
        id
    }: DraftPickArgs): Promise<DraftPick | undefined> {
        let where;

        const query: SelectQueryBuilder<DraftPick> = getRepository(DraftPick)
            .createQueryBuilder('draftPicks')
            .leftJoinAndSelect('draftPicks.user', 'user')
            .leftJoinAndSelect('draftPicks.draft', 'draft')
            .leftJoinAndSelect('draftPicks.player', 'player')


        switch (filterType) {
            case 'byId':
                where = await this._draftPick.byId(id);
                return filterQuery(query, where).getOne();
            default:
                return undefined;
        }
    }

    @UseMiddleware(logger)
    @Mutation(() => Result)
    async createDraftPick(
        @Arg('input') {
            draft,
            player,
            user,
            pickNumber
        }: DraftPickArgs
    ) {
        const draftExists = await Draft.find({
            where: {
                id: draft
            }
        });

        if (!draftExists) {
            return {
                errors: [
                    {
                        path: 'draft-pick',
                        message: 'Draft does not exist'
                    }
                ]
            };
        }
        const creationTime = new Date().toISOString();

        const p = await Player.findOne({
            where: {
                id: player
            }
        });

        const u = await User.findOne({
            where: {
                id: user
            }
        });

        await DraftPick.create({
            user,
            player,
            pickNumber,
            creationTime,
            draft
        }).save();

        return {
            success: [
                {
                    path: 'draft-pick',
                    message: `${u?.username} drafted ${p?.name}!`
                }
            ]
        }
    }

    @UseMiddleware(logger)
    @Mutation(() => Result)
    async deleteDraftPick(
        @Arg('input') {
            id
        }: DraftPickArgs
    ) {
        const DraftPickExists = await DraftPick.findOne({
            where: {
                id
            }
        });

        if (!DraftPickExists) {
            return {
                errors: [
                    {
                        path: 'draft-pick',
                        message: 'Draft Pick does not exist!'
                    }
                ]
            }
        }

        await DraftPick.delete({ id });

        return {
            success: [
                {
                    path: 'draft-pick',
                    message: 'Successfully deleted Draft Pick!'
                }
            ]
        }
    }
}