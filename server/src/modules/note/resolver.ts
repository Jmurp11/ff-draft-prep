import { ResolverMap } from "./../../types/graphql-utils";
import { Note } from './../../entity';
import { getRepository } from "typeorm";

import {
    titleAlreadyExists
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
        }
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

            return true;
        },
        editNote: async (_: any, { // TODO: NEED TO EITHER ADD MORE OPTIONS TO EDIT OR UPDATE THE SCHEMA TYPES
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

            console.log(title, body, source, date);
            return true;
        }
    }
};
