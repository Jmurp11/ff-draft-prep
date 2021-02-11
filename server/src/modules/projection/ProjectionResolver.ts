import { Resolver, Query, Mutation, Arg, UseMiddleware } from 'type-graphql';
import { getRepository } from "typeorm";
import { Projection } from '../../entity/Projection';
import { Team } from '../../entity/Team';
import { Player } from '../../entity/Player';
import { Result } from '../../shared';
import { ProjectionInput } from './inputs/ProjectionInput';
import { logger } from '../../middleware';

@Resolver()
export class ProjectionResolver {
    @UseMiddleware(logger)
    @Query(() => [Projection])
    async projections() {
        return getRepository(Projection)
            .find({
                relations: ['player', 'player.team', 'player.team.stats']
            });
    }

    @UseMiddleware(logger)
    @Query(() => Projection)
    async projection(@Arg('player') player: string) {
        return getRepository(Projection)
            .findOne({
                relations: ['player', 'player.team', 'player.team.stats'],
                where: { player }
            });
    }

    @UseMiddleware(logger)
    @Mutation(() => Result)
    async createProjection(
        @Arg('input') {
            firstName, lastName, team, completions, attempts,
            passTd, passYards, interception, carries, rushYards, rushTd, fumbles,
            receptions, receivingYards,
            receivingTd
        }: ProjectionInput
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
                        team: teamId
                    }
                ]
            });

        if (player) {
            await Projection.create({
                player: player.id,
                completions,
                attempts,
                passTd,
                passYards,
                interception,
                carries,
                rushYards,
                rushTd,
                fumbles,
                receptions,
                receivingYards,
                receivingTd,
            }).save();

            return {
                success: [
                    {
                        path: 'projection',
                        message: 'Projection added successfully!'
                    }
                ]
            };
        } else {
            return {
                errors: [
                    {
                        path: 'projection',
                        message: 'Add projection failed!'
                    }
                ]
            };
        }
    }
}