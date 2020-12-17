import { Resolver, Query, Mutation, Arg, UseMiddleware } from 'type-graphql';
import { Player } from '../../entity';
import { Result } from '../../shared';
import { getRepository, SelectQueryBuilder } from 'typeorm';
import { filterQuery } from '../../utils/filterQuery';
import { PlayerArgs } from './inputs/PlayerArgs';
import { PlayerService } from './services/player-service';
import { logger } from '../../middleware';

const axios = require('axios');

@Resolver()
export class PlayerResolver {
    constructor(
        private _player: PlayerService
    ) { }

    @UseMiddleware(logger)
    @Query(() => [Player])
    async players(
        @Arg('input', { nullable: true }) {
            filterType,
            team,
            position,
            status,
            take,
            skip
        }: PlayerArgs
    ): Promise<Player[] | undefined> {
        let where;

        const query: SelectQueryBuilder<Player> = getRepository(Player)
            .createQueryBuilder('players')
            .leftJoinAndSelect('players.team', 'team')
            .leftJoinAndSelect('team.stadium', 'stadium')
            .leftJoinAndSelect('team.stats', 'stats')
            .leftJoinAndSelect('team.standings', 'standings')
            .leftJoinAndSelect('players.projection', 'projection')
            .leftJoinAndSelect('players.notes', 'notes')
            .take(take)
            .skip(skip)
            .orderBy('players.averageDraftPosition', 'ASC')

        switch (filterType) {
            case 'byTeam':
                console.log('byTeam', await this._player.byTeam(team));
                where = await this._player.byTeam(team);
                return filterQuery(query, where).getMany();
            case 'byPosition':
                where = await this._player.byPosition(position);
                return filterQuery(query, where).getMany();
            case 'byStatus':
                where = await this._player.byStatus(status);
                return filterQuery(query, where).getMany();
            case 'byNotStatus':
                where = await this._player.byNotStatus(status);
                return filterQuery(query, where).getMany();
            case 'byDepthChart':
                where = await this._player.byDepthChart(team, position);
                return filterQuery(query, where).getMany();
            default:
                return query.getMany()
        }
    }

    @UseMiddleware(logger)
    @Query(() => Player)
    async player(@Arg('input') {
        filterType,
        id,
        firstName,
        lastName,
        position
    }: PlayerArgs): Promise<Player | undefined> {
        let where;

        const query: SelectQueryBuilder<Player> = getRepository(Player)
            .createQueryBuilder('players')
            .leftJoinAndSelect('players.team', 'team')
            .leftJoinAndSelect('team.stadium', 'stadium')
            .leftJoinAndSelect('team.stats', 'stats')
            .leftJoinAndSelect('team.standings', 'standings')
            .leftJoinAndSelect('players.projection', 'projection')
            .leftJoinAndSelect('players.notes', 'notes');


        switch (filterType) {
            case 'byId':
                where = await this._player.byId(id);
                return filterQuery(query, where).getOne();
            case 'byName':
                where = await this._player.byName(firstName, lastName);
                return filterQuery(query, where).getOne();
            case 'byNameAndPosition':
                where = await this._player.byNameAndPosition(firstName, lastName, position);
                return filterQuery(query, where).getOne();
            default:
                return undefined;
        }
    }

    // TODO: SHOULD BE ISADMIN, ISAUTH
    @UseMiddleware(logger)
    @Mutation(() => Result)
    async updatePlayers(): Promise<Result> {

        try {
            const response = await axios
                .get(`https://api.sportsdata.io/v3/nfl/scores/json/Players?key=${process.env.SPORTS_DATA_KEY}`);

            const playerList = response.data;

            playerList.forEach(async (player: any) => {
                if (player.PositionCategory === 'OFF' &&
                    (player.Position === 'QB') ||
                    (player.Position === 'RB') ||
                    (player.Position === 'WR') ||
                    (player.Position === 'TE') ||
                    (player.Position === 'K')) {

                    const playerExists = await Player.findOne({
                        where: { id: player.PlayerID },
                        select: ['id']
                    });


                    if (playerExists) {
                        await Player.update(
                            {
                                id: player.PlayerID
                            }, {
                            weight: player.Weight,
                            team: player.TeamID,
                            position: player.Position,
                            status: player.Status,
                            depthChart: player.depthOrder,
                            photoUrl: player.PhotoUrl,
                            averageDraftPosition: player.AverageDraftPosition
                        });
                    } else {
                        await Player.create({
                            id: player.PlayerID,
                            firstName: player.FirstName,
                            lastName: player.LastName,
                            heightFeet: player.HeightFeet,
                            heightInches: player.HeightInches,
                            weight: player.Weight,
                            team: player.TeamID,
                            position: player.Position,
                            status: player.Status,
                            depthChart: player.DepthOrder,
                            photoUrl: player.PhotoUrl,
                            birthDate: player.BirthDateString,
                            college: player.College,
                            draftYear: player.CollegeDraftYear,
                            draftRound: player.CollegeDraftRound,
                            draftPick: player.CollegeDraftPick,
                            isUndrafted: player.IsUndraftedFreeAgent,
                            averageDraftPosition: player.AverageDraftPosition
                        }).save();
                    }
                }
            });

            return {
                success: [
                    {
                        path: 'player',
                        message: 'Successfully retrieved Player data!'
                    }
                ]
            }
        } catch (error) {
            return {
                errors: [
                    {
                        path: 'player',
                        message: error
                    }
                ]
            }
        }
    }
}