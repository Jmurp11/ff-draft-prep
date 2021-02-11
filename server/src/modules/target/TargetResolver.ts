import { Resolver, Query, Mutation, Arg, UseMiddleware, Float, Ctx } from 'type-graphql';
import { Target } from '../../entity/Target';
import { Result, MyContext } from '../../shared';
import { TargetInput } from './inputs/TargetInput';
import { getRepository, SelectQueryBuilder } from 'typeorm';
import { isAuth, logger } from '../../middleware';
import { TargetArgs, DeleteTargetArgs } from './inputs/TargetArgs';
import { filterQuery } from '../../utils/filterQuery';
import { TargetService } from './services/target-service';

@Resolver()
export class TargetResolver {
    constructor(
        private _targets: TargetService
    ) { }

    @UseMiddleware(isAuth, logger)
    @Query(() => [Target])
    async targets(
        @Ctx() ctx: MyContext,
        @Arg('input') {
            filterType,
            user,
            player,
            skip,
            take
        }: TargetArgs) {
        let where;

        const query: SelectQueryBuilder<Target> = getRepository(Target)
            .createQueryBuilder('targets')
            .leftJoinAndSelect('targets.user', 'user')
            .leftJoinAndSelect('targets.player', 'player')
            .leftJoinAndSelect('player.team', 'team')
            .take(take)
            .skip(skip)
            .orderBy('targets.round', 'ASC')

        switch (filterType) {
            case 'byCurrentUser':
                case 'byCurrentUser':
                    if (ctx.payload?.userId) {
                        where = await this._targets.byCurrentUser(ctx);
                        return filterQuery(query, where).getMany();
                    }
                    return [];
            case 'byUser':
                where = await this._targets.byUser(user);
                return filterQuery(query, where).getMany();
            case 'byPlayer':
                where = await this._targets.byPlayer(player);
                return filterQuery(query, where).getMany();
            default:
                return query.getMany()
        }
    }

    @UseMiddleware(isAuth, logger)
    @Query(() => Target)
    async target(
        @Arg('input') {
            user,
            player
        }: TargetArgs) {
        let where;

        const query: SelectQueryBuilder<Target> = getRepository(Target)
            .createQueryBuilder('targets')
            .leftJoinAndSelect('targets.user', 'user')
            .leftJoinAndSelect('targets.player', 'player')
            .leftJoinAndSelect('player.team', 'team')
            .orderBy('targets.round', 'ASC')

        where = await this._targets.byUserAndPlayer(user, player);
        return filterQuery(query, where).getOne();
    }

    @UseMiddleware(isAuth, logger)
    @Query(() => Float, { nullable: true })
    async avgTargetRound(
        @Arg('input') {
            player
        }: TargetArgs) {
        let sum = 0;

        const countTargeted = await getRepository(Target)
            .findAndCount({
                relations: ['player'],
                where: { player }
            });
        countTargeted[0].forEach(el => sum = sum + el.round);

        return sum / countTargeted[1];
    }


    @UseMiddleware(isAuth, logger)
    @Mutation(() => Result)
    async createTarget(
        @Ctx() ctx: MyContext,
        @Arg('input') {
            player,
            round
        }: TargetInput
    ): Promise<Result> {
        console.log('CTX: ' + ctx.payload?.userId);
        const user = ctx.payload?.userId;
        
        const targetExists = await Target.findOne({
            where: { user, player },
            select: ["id"]
        });

        if (targetExists) {
            return {
                errors: [
                    {
                        path: 'target',
                        message: 'Target round for this player already exists!  Remove it before trying again.'
                    }
                ]
            };
        }

        await Target.create({
            user,
            player,
            round
        }).save();

        return {
            success: [
                {
                    path: 'target',
                    message: 'Successfully added target!'
                }
            ]
        }
    }

    @UseMiddleware(isAuth, logger)
    @Mutation(() => Result)
    async deleteTarget(
        @Arg('input') {
            id
        }: DeleteTargetArgs
    ): Promise<Result> {
        const target = await Target.findOne({
            where: { id },
            select: ["id"]
        });

        if (!target) {
            return {
                errors: [
                    {
                        path: 'target',
                        message: 'This target does not exist!'
                    }
                ]
            };
        }

        await Target.delete({ id });

        return {
            success: [
                {
                    path: 'target',
                    message: 'Successfully deleted target!'
                }
            ]
        }
    }
}