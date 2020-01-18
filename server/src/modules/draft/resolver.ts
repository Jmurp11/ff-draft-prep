import { ResolverMap } from "./../../types/graphql-utils";
import { Draft } from './../../entity';
import { getRepository } from "typeorm";
import {
    titleAlreadyExists
} from "./errorMessages";


export const resolvers: ResolverMap = {
    Query: {
        drafts: async (_: any, { user }: GQL.IDraftsOnQueryArguments) => {
            return getRepository(Draft)
                .find({
                    join: {
                        alias: "draft",
                        leftJoinAndSelect: {
                            user: "draft.user"
                        }
                    }, where: { user }
                });
        },
        draft: async (_: any, { id }: GQL.IDraftOnQueryArguments) => {
            return getRepository(Draft)
                .findOne({
                    join: {
                        alias: "draft",
                        leftJoinAndSelect: {
                            user: "draft.user",
                        }
                    }, where: { id }
                });
        },
    },
    Mutation: {
        createDraft: async (_: any, {
            user,
            date,
            type,
            numberOfTeams,
            title,
        }: GQL.ICreateDraftOnMutationArguments) => {
            const titleExists = await Draft.findOne({
                where: {
                    user,
                    title
                },
                select: ['id']
            });

            if (titleExists) {
                return [
                    {
                        path: 'draft',
                        message: titleAlreadyExists
                    }
                ]
            }

            await Draft.create({
                user,
                date,
                type,
                numberOfTeams,
                title
            }).save();
            
            return null;
        }
    }
};