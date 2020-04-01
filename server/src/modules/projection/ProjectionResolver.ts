import { Resolver, Query, Mutation, Arg } from 'type-graphql';
import { getRepository } from "typeorm";
import {
    Player,
    Projection,
    Team
} from '../../entity';
import { Result } from '../../shared';
import { ProjectionInput } from './inputs/ProjectionInput';

@Resolver()
export class ProjectionResolver {
    @Query(() => [Projection])
    async projections() {
        return getRepository(Projection)
            .find({
                relations: ['player', 'player.team', 'player.team.team']
            });
    }

    @Query(() => Projection)
    async projection(@Arg('player') player: string) {
        return getRepository(Projection)
            .findOne({
                relations: ['player', 'player.team', 'player.team.team'],
                where: { player }
            });
    }

    @Mutation(() => Result)
    async createProjection(
        @Arg('input') {
            firstName, lastName, team, completions, attempts,
            passTd, passYards, interception, carries, rushYards, rushTd, fumbles,
            receptions, receivingYards,
            receivingTd, fantasyPoints
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
                fantasyPoints
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