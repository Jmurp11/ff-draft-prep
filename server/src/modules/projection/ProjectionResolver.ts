import { Resolver, Query, Mutation, Arg } from 'type-graphql';
import { getRepository } from "typeorm";
import {
    Player,
    Projection,
    Team,
    TeamStats
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

        const teamStatsResult = await TeamStats.findOne({
            where: { id: teamResult!.id }
        });

        const teamId = teamStatsResult!.id;

        const players = await getRepository(Player)
            .find({
                relations: ['team'],
                where: [
                    {
                        team: teamId
                    }
                ]
            });

        let id = 0;

        players.forEach(el => {
            if (el.firstName === firstName && el.lastName === lastName) {
                id = el.id;
            }
        });

        if (id !== 0) {
            await Projection.create({
                player: id,
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