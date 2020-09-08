import { Resolver, Query, Mutation, Arg, UseMiddleware } from 'type-graphql';
import { Standings } from '../../entity';
import { Result } from '../../shared';
import { logger } from '../../middleware';

const axios = require('axios');

@Resolver()
export class StandingsResolver {
    @UseMiddleware(logger)
    @Query(() => [Standings])
    async standings() {
        return Standings.find({
            relations: ['team'],
            order: {
                wins: 'DESC'
            }
        });
    }

    @UseMiddleware(logger)
    @Query(() => Standings)
    async standing(@Arg('team') team: string) {
        return Standings.findOne({
            relations: ['team'],
            where: {
                team
            }
        });
    }

    @UseMiddleware(logger)
    @Mutation(() => Result)
    async updateStandings(): Promise<Result> {
        const year = new Date().getFullYear() - 1;
        console.log(year);
        try {
            const response = await axios
                .get(`https://api.sportsdata.io/v3/nfl/scores/json/Standings/${year}?key=${process.env.SPORTS_DATA_KEY}`);

            const standings = response.data;

            standings.forEach(async (standings: any) => {
                const standingExists = await Standings.findOne({
                    where: {
                        team: standings.TeamID
                    },
                    select: ['team']
                });

                if (standingExists) {
                    await Standings.update(
                        {
                            team: standings.TeamID
                        },
                        {
                        wins: standings.Wins,
                        losses: standings.Losses,
                        ties: standings.Ties,
                        divisionWins: standings.DivisionWins,
                        divisionLosses: standings.DivisionLosses,
                        divisionTies: standings.DivisionTies,
                        conferenceWins: standings.ConferenceWins,
                        conferenceLosses: standings.ConferenceLosses,
                        conferenceTies: standings.ConferenceTies,
                        pointsFor: standings.PointsFor,
                        pointsAgainst: standings.PointsAgainst,
                        touchdowns: standings.Touchdowns
                    });
                } else {
                    await Standings.create({
                        team: standings.TeamID,
                        wins: standings.Wins,
                        losses: standings.Losses,
                        ties: standings.Ties,
                        divisionWins: standings.DivisionWins,
                        divisionLosses: standings.DivisionLosses,
                        divisionTies: standings.DivisionTies,
                        conferenceWins: standings.ConferenceWins,
                        conferenceLosses: standings.ConferenceLosses,
                        conferenceTies: standings.ConferenceTies,
                        pointsFor: standings.PointsFor,
                        pointsAgainst: standings.PointsAgainst,
                        touchdowns: standings.Touchdowns
                    }).save();
                }
            });

            return {
                success: [
                    {
                        path: 'Standings',
                        message: 'Successfully retrieved Standings data!'
                    }
                ]
            }
        } catch (error) {
            return {
                errors: [
                    {
                        path: 'Standings',
                        message: error
                    }
                ]
            }
        }
    }
}
