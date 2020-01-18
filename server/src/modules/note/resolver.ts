import { ResolverMap } from "./../../types/graphql-utils";
import { Note } from './../../entity';
import { getRepository, getConnection } from "typeorm";

import {
    titleAlreadyExists, cannotFindNote
} from "./errorMessages";


export const resolvers: ResolverMap = {
    Query: {
        note: async (_: any, { id }: GQL.INoteOnQueryArguments) => {
            return getRepository(Note)
                .findOne({
                    join: {
                        alias: "note",
                        leftJoinAndSelect: {
                            user: "note.user",
                            player: "note.player",
                        }
                    }, where: { id }
                });
        },
        notes: async (_: any) => {
            return getRepository(Note)
                .find({
                    join: {
                        alias: "note",
                        leftJoinAndSelect: {
                            user: "note.user",
                            player: "note.player",
                        }
                    }
                });
        },
        notesByUser: async (_: any, { user }: GQL.INotesByUserOnQueryArguments) => {
            return getRepository(Note)
                .find({
                    join: {
                        alias: "note",
                        leftJoinAndSelect: {
                            user: "note.user",
                            player: "note.player",
                        }
                    }, where: { user }
                });
        },
    },
    Mutation: {
        addNote: async (_: any, {
            user,
            player,
            date,
            title,
            body,
            source
        }: GQL.IAddNoteOnMutationArguments) => {
            const titleExists = await Note.findOne({
                where: {
                    user,
                    player,
                    title
                },
                select: ['id']
            });

            if (titleExists) {
                return [
                    {
                        path: 'note',
                        message: titleAlreadyExists
                    }
                ]
            }

            await Note.create({
                user,
                player,
                date,
                title,
                body,
                source
            }).save();

            return null;
        },
        editNote: async (_: any, {
            id,
            user,
            player,
            date,
            title,
            body,
            source
        }: GQL.IEditNoteOnMutationArguments) => {
            const titleExists = await Note.findOne({
                where: {
                    user,
                    player,
                    title
                },
                select: ['id']
            });

            if (titleExists) {
                return [
                    {
                        path: 'note',
                        message: titleAlreadyExists
                    }
                ]
            }

            await Note.update({ id }, {
                date,
                title,
                body,
                source
            });

            return null;
        },
        deleteNote: async (_: any, { id }: GQL.IDeleteNoteOnMutationArguments) => {
            const noteExists = await Note.findOne({
                where: {
                    id
                }
            });

            if (noteExists) {
                await getConnection()
                    .createQueryBuilder()
                    .delete()
                    .from(Note)
                    .where("id = id", { id })
                    .execute();

                return null;
            }

            return [
                {
                    path: 'note',
                    message: cannotFindNote
                }
            ]
        }
    }
};
