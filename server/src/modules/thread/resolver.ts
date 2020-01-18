import { ResolverMap } from "./../../types/graphql-utils";
import { Thread } from './../../entity';
import { getRepository, getConnection } from "typeorm";

import {
    threadAlreadyExists,
    cannotDeleteThread
} from "./errorMessages";


export const resolvers: ResolverMap = {
    Query: {
        thread: async (_: any, { id }: GQL.IThreadOnQueryArguments) => {
            return getRepository(Thread)
                .findOne({
                    join: {
                        alias: "thread",
                        leftJoinAndSelect: {
                            user: "thread.creator",
                        }
                    }, where: { id }
                });
        },
        threads: async (_: any) => {
            return getRepository(Thread)
                .find({
                    join: {
                        alias: "thread",
                        leftJoinAndSelect: {
                            user: "thread.creator",
                        }
                    }
                });
        },
        threadsByUser: async (_: any, { creator }: GQL.IThreadsByUserOnQueryArguments) => {
            return getRepository(Thread)
                .find({
                    join: {
                        alias: "thread",
                        leftJoinAndSelect: {
                            user: "thread.creator",
                        }
                    }, where: { creator }
                });
        },
    },
    Mutation: {
        createThread: async (_: any, {
            creator,
            dateCreated,
            title
        }: GQL.ICreateThreadOnMutationArguments) => {
            const threadExists = await Thread.findOne({
                where: {
                    creator,
                    dateCreated,
                    title
                },
                select: ['id']
            });

            if (threadExists) {
                return [
                    {
                        path: 'thread',
                        message: threadAlreadyExists
                    }
                ]
            }

            await Thread.create({
                creator,
                dateCreated,
                title
            }).save();

            return null;
        },
        deleteThread: async (_: any, { id }: GQL.IDeleteThreadOnMutationArguments) => {
            const threadExists = await Thread.findOne({
                where: {
                    id
                }
            });

            if (threadExists) {
                await getConnection()
                    .createQueryBuilder()
                    .delete()
                    .from(Thread)
                    .where("id = id", { id })
                    .execute();

                return null;
            }

            return [
                {
                    path: 'thread',
                    message: cannotDeleteThread
                }
            ]
        }
    }
};
