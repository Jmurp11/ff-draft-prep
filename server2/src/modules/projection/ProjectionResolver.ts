import { Resolver, Query, Mutation, Arg } from 'type-graphql';
import { getRepository } from "typeorm";
import {
    Player,
    Projection,
    Team
} from '../../entity';
import { Result } from '../../types';
import { ProjectionInput } from './inputs/ProjectionInput';

@Resolver()
export class ProjectionResolver {
    @Query(() => [Projection])
    async projections() {
        return getRepository(Projection)
                .find({
                    join: {
                        alias: "projection",
                        leftJoinAndSelect: {
                            player: "projection.player",
                            team: "player.team"
                        }
                    }
                });
    }

    @Query(() => Projection)
    async projection(@Arg('player') player: string) {
        return getRepository(Projection)
        .findOne({
            join: {
                alias: "projection",
                leftJoinAndSelect: {
                    player: "projection.player",
                    team: "player.team"
                }
            }, where: { player }
        });
    }

    @Mutation(() => Result)
    async createPlayer(
        @Arg('input') {
            firstName, lastName, team, completions, attempts,
            passTd, passYards, interception, carries, rushYards, rushTd, fumbles,
            receptions, receivingYards,
            receivingTd, fantasyPoints
        }: ProjectionInput
    ): Promise<Result> {
        const teamQueryResult = await Team.find({ where: { abbreviation: team } });
        const teamId = teamQueryResult[0].id;
        const players = await getRepository(Player)
            .find({
                join: {
                    alias: "player",
                    leftJoinAndSelect: {
                        team: "player.team",
                    }
                },
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