import { ResolverMap } from "./../../types/graphql-utils";
import { DraftPick } from './../../entity';
import { getRepository } from "typeorm";

export const resolvers: ResolverMap = {
    Query: {
        draftPicks: async (_: any, { draft }: GQL.IDraftPicksOnQueryArguments) => {
            return getRepository(DraftPick)
                .find({
                    join: {
                        alias: "draftpick",
                        leftJoinAndSelect: {
                            draft: "draftpick.draft"
                        }
                    }, where: { draft }
                });
        }
    },
    Mutation: {
        createDraftPick: async (_: any, {
            draft,
            player,
            picked
        }: GQL.ICreateDraftPickOnMutationArguments) => {
            await DraftPick.create({
                draft,
                player,
                picked
            }).save();

            return null;
        }
    }
};