import { ResolverMap } from "./../../types/graphql-utils";
import {
    Team
} from './../../entity';
import { teamAlreadyExists } from "./errorMessages";

export const resolvers: ResolverMap = {
    Query: {
        teamById: async (_: any, { id }: GQL.ITeamByIdOnQueryArguments) => {
            const team = await Team.find({ where: { id } });

            return team[0];
        },
        teamByAbbreviation: async (_: any, { abbreviation }: GQL.ITeamByAbbreviationOnQueryArguments) => {
            const team = await Team.find({ where: { abbreviation } });

            return team[0];
        },
        teams: async (_: any) => {
            const team = await Team.find();

            return team;
        }
    },
    Mutation: {
        createTeam: async (_: any, {
            city,
            nickname,
            abbreviation,
            bye,
            imageUrl,
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
        }: GQL.ICreateTeamOnMutationArguments) => {
            const teamExists = await Team.findOne({
                where: { nickname },
                select: ["id"]
            });

            if (teamExists) {
                return [
                    {
                        path: "team",
                        message: teamAlreadyExists
                    }
                ];
            }
            const team = Team.create({
                city,
                nickname,
                abbreviation,
                bye,
                imageUrl,
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
            });

            await team.save();

            return null;
        },
    }
};