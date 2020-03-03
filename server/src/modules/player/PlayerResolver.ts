import { Resolver, Query, Mutation, Arg } from 'type-graphql';
import { Player, Team, TeamStats } from '../../entity';
import { Result } from '../../shared';
import { PlayerInput } from './inputs/PlayerInput';
import { getRepository } from 'typeorm';

@Resolver()
export class PlayerResolver {
    @Query(() => [Player])
    async players() {
        return getRepository(Player)
        .find({
            relations: ['team', 'team.team'],
            order: {
                lastName: 'DESC'
            }
        });
    }

    @Query(() => Player)
    async player(@Arg('id') id: string) {
        return getRepository(Player)
        .findOne({
            relations: ['team', 'team.team'], 
            where: { id }
        });
    }

    @Mutation(() => Result)
    async createPlayer(
        @Arg('input') {
            firstName,
            lastName,
            team,
            position,
            rank,
            adp,
            tier
        }: PlayerInput
    ): Promise<Result> {
        const teamResult = await Team.findOne({
            where: { abbreviation: team }
        });

        const teamStatsResult = await TeamStats.findOne({
            where: { id: teamResult!.id }
        });

        const teamId = teamStatsResult!.id;

        const playerExists = await Player.findOne({
            where: { firstName, lastName, teamId, position },
            select: ["id"]
        });

        if (playerExists) {
            return {
                errors: [
                    {
                        path: 'player',
                        message: 'Player already exists!'
                    }
                ]
            };
        }

        await Player.create({
            firstName,
            lastName,
            team: teamId,
            position,
            rank,
            adp,
            tier
        }).save();

        return {
            success: [
                {
                    path: 'player',
                    message: 'Successfully added player!'
                }
            ]
        }
    }
}