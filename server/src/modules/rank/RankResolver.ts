import { Resolver, Query, Mutation, Arg } from 'type-graphql';
import { DefaultRank, Rank, Player, Team } from '../../entity';
import { Result } from '../../shared';
import { RankInput, DefaultRankInput } from './inputs/RankInput';
import { UpdateRankInput } from './inputs/UpdateRankInput';
import { getRepository } from 'typeorm';

@Resolver()
export class RankResolver {
    @Query(() => Rank)
    async rank(@Arg('id') id: string) {
        return getRepository(Rank)
            .findOne({
                relations: ['user', 'player'],
                where: { id }
            });
    }

    @Mutation(() => Result)
    async createRank(
        @Arg('input') {
            user,
            firstName,
            lastName,
            team,
            position,
            rank,
            adp,
            tier
        }: RankInput
    ): Promise<Result> {
        const teamResult = await Team.findOne({ where: { abbreviation: team } });

        const teamId = teamResult!.id;

        const player = await getRepository(Player)
            .findOne({
                relations: ['team'],
                where: [
                    {
                        firstName,
                        lastName,
                        position,
                        team: teamId
                    }
                ]
            });

        if (!player) {
            return {
                errors: [
                    {
                        path: 'Rank',
                        message: 'Player does not exist!'
                    }
                ]
            };
        }
        const rankExists = await Rank.findOne({
            where: { user, player },
            select: ["id"]
        });

        if (rankExists) {
            return {
                errors: [
                    {
                        path: 'Rank',
                        message: 'Rank already exists!'
                    }
                ]
            };
        }

        await Rank.create({
            user,
            player: player.id,
            rank,
            adp,
            tier
        }).save();

        return {
            success: [
                {
                    path: 'Rank',
                    message: 'Successfully added Rank!'
                }
            ]
        }
    }

    @Mutation(() => Result)
    async createDefaultRank(
        @Arg('input') {
            firstName,
            lastName,
            team,
            position,
            rank,
            adp,
            tier
        }: DefaultRankInput
    ): Promise<Result> {
        const teamResult = await Team.findOne({ where: { abbreviation: team } });

        const teamId = teamResult!.id;

        const player = await getRepository(Player)
            .findOne({
                relations: ['team'],
                where: [
                    {
                        firstName,
                        lastName,
                        position,
                        team: teamId
                    }
                ]
            });

        if (!player) {
            return {
                errors: [
                    {
                        path: 'Rank',
                        message: 'Player does not exist!'
                    }
                ]
            };
        }
        const rankExists = await DefaultRank.findOne({
            where: { player },
            select: ["id"]
        });

        if (rankExists) {
            return {
                errors: [
                    {
                        path: 'Rank',
                        message: 'Rank already exists!'
                    }
                ]
            };
        }

        await DefaultRank.create({
            player: player.id,
            rank,
            adp,
            tier
        }).save();

        return {
            success: [
                {
                    path: 'Rank',
                    message: 'Successfully added Rank!'
                }
            ]
        }
    }

    @Mutation(() => Result)
    async updateRank(
        @Arg('input') {
            id,
            rank,
            adp,
            tier
        }: UpdateRankInput
    ): Promise<Result> {

        const currentRank = await Rank.findOne({
            where: { id},
            select: ["id"]
        });

        if (!currentRank) {
            return {
                errors: [
                    {
                        path: 'Rank',
                        message: 'Rank does not exist!'
                    }
                ]
            };
        }

        await Rank.update({ id }, {
            rank,
            adp,
            tier
        });

        return {
            success: [
                {
                    path: 'Rank',
                    message: `Successfully updated ranking!`
                }
            ]
        }
    }
}