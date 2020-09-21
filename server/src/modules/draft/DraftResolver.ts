import { Resolver, Query, Mutation, Arg, UseMiddleware } from 'type-graphql';
import { DraftService } from "./services/draft-service";
import { logger } from "../../middleware";
import { Draft } from "../../entity";
import { DraftArgs } from "./inputs/DraftArgs";
import { SelectQueryBuilder, getRepository } from "typeorm";
import { filterQuery } from "../../utils/filterQuery";
import { Result } from '../../shared';

@Resolver()
export class DraftResolver {
    constructor(
        private _draft: DraftService
    ) { }

    @UseMiddleware(logger)
    @Query(() => [Draft])
    async drafts(
        @Arg('input', { nullable: true }) {
            filterType,
            type,
            numOfTeams,
            isActive,
            take,
            skip
        }: DraftArgs
    ): Promise<Draft[] | undefined> {
        let where;

        const query: SelectQueryBuilder<Draft> = getRepository(Draft)
            .createQueryBuilder('drafts')
            .leftJoinAndSelect('drafts.draftPicks', 'draftPicks')
            .leftJoinAndSelect('draftPicks.user', 'user')
            .leftJoinAndSelect('draftPicks.player', 'player')
            .take(take)
            .skip(skip)
            .orderBy('drafts.creationTime', 'DESC')

        switch (filterType) {
            case 'byType':
                where = await this._draft.byType(type);
                return filterQuery(query, where).getMany();
            case 'byActive':
                where = await this._draft.byActive(isActive);
                return filterQuery(query, where).getMany();
            case 'byInactive':
                where = await this._draft.byInactive(isActive);
                return filterQuery(query, where).getMany();
            case 'byNumOfTeams':
                where = await this._draft.byNumOfTeams(numOfTeams);
                return filterQuery(query, where).getMany();
            case 'byTypeAndNumOfTeams':
                where = await this._draft.byTypeAndNumOfTeams(numOfTeams, type);
                return filterQuery(query, where).getMany();
            default:
                return query.getMany()
        }
    }

    @UseMiddleware(logger)
    @Query(() => Draft)
    async draft(@Arg('input') {
        filterType,
        id
    }: DraftArgs): Promise<Draft | undefined> {
        let where;

        const query: SelectQueryBuilder<Draft> = getRepository(Draft)
            .createQueryBuilder('drafts')
            .leftJoinAndSelect('drafts.draftPicks', 'draftPicks')
            .leftJoinAndSelect('draftPicks.user', 'user')
            .leftJoinAndSelect('draftPicks.player', 'player')


        switch (filterType) {
            case 'byId':
                where = await this._draft.byId(id);
                return filterQuery(query, where).getOne();
            default:
                return undefined;
        }
    }

    @UseMiddleware(logger)
    @Mutation(() => Result)
    async createDraft(
        @Arg('input') {
            type,
            numOfTeams,
            timePerPick
        }: DraftArgs
    ) {
        const creationTime = new Date().toISOString();

        await Draft.create({
            type,
            numOfTeams,
            timePerPick,
            creationTime
        }).save();

        return {
            success: [
                {
                    path: 'draft',
                    message: 'Successfully added draft!'
                }
            ]
        }
    }

    @UseMiddleware(logger)
    @Mutation(() => Result)
    async updateDraftStatus(
        @Arg('input') {
            id
        }: DraftArgs
    ) {
        const draftExists = await Draft.findOne({
            where: {
                id
            }
        });

        if (!draftExists) {
            return {
                errors: [
                    {
                        path: 'draft',
                        message: 'Draft does not exist!'
                    }
                ]
            }
        }

        await Draft.update(
            { id },
            {
                isActive: false
            });

        return {
            success: [
                {
                    path: 'draft',
                    message: 'Successfully updated draft!'
                }
            ]
        }
    }

    @UseMiddleware(logger)
    @Mutation(() => Result)
    async deleteDraft(
        @Arg('input') {
            id
        }: DraftArgs
    ) {
        const draftExists = await Draft.findOne({
            where: {
                id
            }
        });

        if (!draftExists) {
            return {
                errors: [
                    {
                        path: 'draft',
                        message: 'Draft does not exist!'
                    }
                ]
            }
        }

        await Draft.delete({ id });

        return {
            success: [
                {
                    path: 'draft',
                    message: 'Successfully deleted draft!'
                }
            ]
        }
    }
}