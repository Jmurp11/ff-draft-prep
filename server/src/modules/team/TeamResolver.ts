import { Resolver, Query, Mutation, Arg } from 'type-graphql';
import { Team } from '../../entity';
import { Result } from '../../shared';
import { TeamInput } from './inputs/TeamInput';

@Resolver()
export class TeamResolver {
    @Query(() => [Team])
    async teams() {
        return Team.find({
            relations: ['stats'],
            order: {
                abbreviation: 'ASC'
            }
        });
    }

    @Query(() => Team)
    async team(@Arg('id') id: string) {
        return Team.findOne({
            relations: ['stats'],
            where: {
                id
            }
        });
    }

    @Query(() => Team)
    async teamByAbbreviation(@Arg('abbreviation') abbreviation: string) {
        return Team.findOne({
            where: {
                abbreviation
            }
        });
    }

    @Mutation(() => Result)
    async createTeam(
        @Arg('input') {
            id,
            city,
            nickname,
            abbreviation,
            imageUrl
        }: TeamInput
    ): Promise<Result> {

        await Team.create({
            id,
            city,
            nickname,
            abbreviation,
            imageUrl
        }).save();

        return {
            success: [
                {
                    path: 'team',
                    message: 'Successfully added team!'
                }
            ]
        }
    }
}