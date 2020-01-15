import { ResolverMap } from "./../../types/graphql-utils";
import { Message } from './../../entity';
import { getRepository, getConnection } from "typeorm";
import { cannotFindMessage } from './errorMessages';

export const resolvers: ResolverMap = {
    Query: {
        message: async (_: any, { id }: GQL.IMessageOnQueryArguments) => {
            return getRepository(Message)
                .findOne({
                    join: {
                        alias: "message",
                        leftJoinAndSelect: {
                            user: "message.author",
                            thread: "message.thread",
                        }
                    }, where: { id }
                });
        },
        messages: async (_: any, { thread }: GQL.IMessagesOnQueryArguments) => {
            return getRepository(Message)
                .find({
                    join: {
                        alias: "message",
                        leftJoinAndSelect: {
                            user: "message.author",
                            thread: "message.thread",
                        }
                    }, where: { thread }
                });
        },
        messagesByUser: async (_: any, { author }: GQL.IMessagesByUserOnQueryArguments) => {
            return getRepository(Message)
                .find({
                    join: {
                        alias: "message",
                        leftJoinAndSelect: {
                            user: "message.author",
                            message: "message.thread",
                        }
                    }, where: { author }
                });
        },
    },
    Mutation: {
        createMessage: async (_: any, {
            author,
            thread,
            dateCreated,
            body
        }: GQL.ICreateMessageOnMutationArguments) => {
            await Message.create({
                author,
                thread,
                dateCreated,
                body
            }).save();

            return null;
        },
        deleteMessage: async (_: any, { id }: GQL.IDeleteMessageOnMutationArguments) => {
            const messageExists = await Message.findOne({
                where: {
                    id
                }
            });

            if (messageExists) {
                await getConnection()
                    .createQueryBuilder()
                    .delete()
                    .from(Message)
                    .where("id = id", { id })
                    .execute();

                return null;
            }

            return [
                {
                    path: 'message',
                    message: cannotFindMessage
                }
            ]
        }
    }
};
