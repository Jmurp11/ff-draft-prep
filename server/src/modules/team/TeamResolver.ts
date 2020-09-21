import { Resolver, Query, Mutation, Arg, UseMiddleware } from 'type-graphql';
import { Team } from '../../entity';
import { Result } from '../../shared';
import { SelectQueryBuilder, getRepository } from 'typeorm';
import { filterQuery } from '../../utils/filterQuery';
import { TeamService } from './services/team-service';
import { TeamArgs } from './inputs/TeamArgs';
import { logger } from '../../middleware';

const axios = require('axios');

@Resolver()
export class TeamResolver {

    constructor(
        private _teams: TeamService
    ) { }

    @UseMiddleware(logger)
    @Query(() => [Team])
    async teams(
        @Arg('input', { nullable: true }) {
            filterType,
            city,
            conference,
            division,
            take,
            skip
        }: TeamArgs
    ) {
        let where;

        const query: SelectQueryBuilder<Team> = getRepository(Team)
            .createQueryBuilder('teams')
            .leftJoinAndSelect('teams.standings', 'standings')
            .leftJoinAndSelect('teams.stats', 'stats')
            .leftJoinAndSelect('teams.stadium', 'stadium')
            .take(take)
            .skip(skip)
            .orderBy('teams.abbreviation', 'ASC');


        switch (filterType) {
            case 'byCity':
                where = await this._teams.byCity(city);
                return filterQuery(query, where).getMany();
            case 'byConference':
                where = await this._teams.byConference(conference);
                return filterQuery(query, where).getMany();
            case 'byDivision':
                where = await this._teams.byDivision(conference, division);
                return filterQuery(query, where).getMany();
            default:
                return query.getMany()
        }
    }

    @UseMiddleware(logger)
    @Query(() => Team)
    async team(
        @Arg('input', { nullable: true }) {
            filterType,
            id,
            nickname,
            abbreviation
        }: TeamArgs) {
        let where;

        const query: SelectQueryBuilder<Team> = getRepository(Team)
            .createQueryBuilder('teams')
            .leftJoinAndSelect('teams.standings', 'standings')
            .leftJoinAndSelect('teams.stats', 'stats');


        switch (filterType) {
            case 'byId':
                where = await this._teams.byId(id);
                return filterQuery(query, where).getOne();
            case 'byNickname':
                where = await this._teams.byNickName(nickname);
                return filterQuery(query, where).getOne();
            case 'byAbbreviation':
                where = await this._teams.byAbbreviation(abbreviation);
                return filterQuery(query, where).getOne();
            default:
                return undefined;
        }
    }

    @UseMiddleware(logger)
    @Mutation(() => Result)
    async updateTeams(): Promise<Result> {

        try {
            const response = await axios
                .get(`https://api.sportsdata.io/v3/nfl/scores/json/Teams?key=${process.env.SPORTS_DATA_KEY}`);

            const teamList = response.data;

            teamList.forEach(async (team: any) => {
                const teamExists = await Team.findOne({
                    where: {
                        id: team.TeamId
                    },
                    select: ['id']
                });

                if (teamExists) {
                    await Team.update(
                        {
                            id: team.TeamID
                        }, {
                        city: team.City,
                        nickname: team.Name,
                        abbreviation: team.Key,
                        byeWeek: team.ByeWeek,
                        logoUrl: team.WikipediaLogoUrl,
                        primaryColor: team.PrimaryColor,
                        secondaryColor: team.SecondaryColor,
                        conference: team.Conference,
                        division: team.Division,
                        headCoach: team.HeadCoach,
                        offensiveCoordinator: team.OffensiveCoordinator,
                        defensiveCoordinator: team.DefensiveCoordinator,
                        offensiveScheme: team.OffensiveScheme,
                        defensiveScheme: team.DefensiveScheme,
                        stadium: team.StadiumDetails.StadiumID
                    });
                } else {
                    await Team.create({
                        id: team.TeamID,
                        city: team.City,
                        nickname: team.Name,
                        abbreviation: team.Key,
                        byeWeek: team.ByeWeek,
                        logoUrl: team.WikipediaLogoUrl,
                        primaryColor: team.PrimaryColor,
                        secondaryColor: team.SecondaryColor,
                        conference: team.Conference,
                        division: team.Division,
                        headCoach: team.HeadCoach,
                        offensiveCoordinator: team.OffensiveCoordinator,
                        defensiveCoordinator: team.DefensiveCoordinator,
                        offensiveScheme: team.OffensiveScheme,
                        defensiveScheme: team.DefensiveScheme,
                        stadium: team.StadiumDetails.StadiumID
                    }).save();
                }
            });

            return {
                success: [
                    {
                        path: 'team',
                        message: 'Successfully retrieved Team data!'
                    }
                ]
            }
        } catch (error) {
            return {
                errors: [
                    {
                        path: 'team',
                        message: error
                    }
                ]
            }
        }
    }
}