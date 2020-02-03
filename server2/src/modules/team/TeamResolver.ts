import { Resolver, Query, Mutation, Arg } from 'type-graphql';
import { Team } from '../../entity';
import { Result } from '../../types';
import { TeamInput } from './inputs/TeamInput';

@Resolver(Team)
export class TeamResolver {
    @Query(() => [Team])
    async teams(): Promise<Team[]> {
        return Team.find();
    }

    @Query(() => Team)
    async team(@Arg('id') id: string): Promise<Team | undefined> {
        return Team.findOne({
            where: {
                id
            }
        });
    }

    @Query(() => Team)
    async teamByAbbreviation(@Arg('abbreviation') abbreviation: string): Promise<Team | undefined> {
        return Team.findOne({
            where: {
                abbreviation
            }
        });
    }

    @Mutation(() => Result)
    async createTeam(
        @Arg('input') {
            city,
            nickname,
            abbreviation,
            imageUrl
        }: TeamInput
    ): Promise<Result> {

        await Team.create({
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