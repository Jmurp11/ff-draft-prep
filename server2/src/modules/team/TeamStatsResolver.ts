import { Resolver, Query, Mutation, Arg } from 'type-graphql';
import { getRepository } from 'typeorm';
import { Team, TeamStats } from '../../entity';
import { Result } from '../../types';
import { TeamStatsInput } from './inputs/TeamStatsInput';

@Resolver()
export class TeamStatsResolver {
    @Query(() => [TeamStats])
    async teams() {
        return getRepository(TeamStats)
            .find({
                relations: ['team']
            });
    }

    @Query(() => TeamStats)
    async player(@Arg('id') id: string) {
        return getRepository(TeamStats)
            .findOne({
                relations: ['team'], 
                where: { id }
            });
    }

    @Mutation(() => Result)
    async addTeamStats(
        @Arg('input') {
            team,
            rank,
            passRank,
            rushRank,
            pointsFor,
            yards,
            plays,
            yardsPerPlay,
            turnovers,
            passAttempts,
            passCompletions,
            passYards,
            passTd,
            interception,
            netYardsPerPass,
            rushAttempt,
            rushYards,
            rushTd,
            yardsPerRush,
            scorePercentage,
            turnoverPercentage,
            offensiveLineRank,
            runningBackSoS
        }: TeamStatsInput
    ): Promise<Result> {
        const teamResult = await Team.findOne({
            where: {
                id: team
            }
        });

        if (!team) {
            return {
                errors: [
                    {
                        path: 'team-stats',
                        message: 'Team does not exist!'
                    }
                ]
            };
        }

        await TeamStats.create({
            team: teamResult!.id,
            rank,
            passRank,
            rushRank,
            pointsFor,
            yards,
            plays,
            yardsPerPlay,
            turnovers,
            passAttempts,
            passCompletions,
            passYards,
            passTd,
            interception,
            netYardsPerPass,
            rushAttempt,
            rushYards,
            rushTd,
            yardsPerRush,
            scorePercentage,
            turnoverPercentage,
            offensiveLineRank,
            runningBackSoS
        }).save();

        return {
            success: [
                {
                    path: 'team-stats',
                    message: 'Successfully added team stats',
                }
            ]
        }
    }
}
