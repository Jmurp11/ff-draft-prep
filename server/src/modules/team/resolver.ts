import { ResolverMap } from "./../../types/graphql-utils";
import {
    Team
} from './../../entity';
import { teamAlreadyExists } from "./errorMessages";

export const resolvers: ResolverMap = {
    Query: {
        team: async (_: any, { id }: GQL.ITeamOnQueryArguments) => {
            return Team.findOne({ where: { id } });
        },
        teamByAbbreviation: async (_: any, { abbreviation }: GQL.ITeamByAbbreviationOnQueryArguments) => {
            return Team.findOne({ where: { abbreviation } });
        },
        teams: async (_: any) => {
            return Team.find();
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

            await Team.create({
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
            }).save();

            return null;
        },
    }
};
