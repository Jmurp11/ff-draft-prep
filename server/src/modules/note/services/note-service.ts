import { Service } from 'typedi';
import { Fields, Where } from '../../../utils/filterQuery';
import { MyContext } from '../../../shared';


@Service()
export class NoteService {
    async byPlayer(player: number): Promise<Where | undefined> {
        const fields: Fields = {
            fieldTable: 'notes',
            fieldName: 'player',
            fieldOptions: {
                is: player
            }
        };

        const filters: Where = {
            AND: [
                fields
            ]
        }

        return filters;
    }

    async byId(id: string): Promise<Where | undefined> {
        const fields: Fields = {
            fieldTable: 'notes',
            fieldName: 'id',
            fieldOptions: {
                is: `'${id}'`
            }
        };

        const filters: Where = {
            AND: [
                fields
            ]
        }

        return filters;
    }

    async byUser(user: string): Promise<Where | undefined> {
        const fields: Fields = {
            fieldTable: 'notes',
            fieldName: 'user',
            fieldOptions: {
                is: `'${user}'`
            }
        };

        const filters: Where = {
            AND: [
                fields
            ]
        }

        return filters;
    }

    async byCurrentUser(ctx: MyContext): Promise<Where | undefined> {
        const fields: Fields = {
            fieldTable: 'notes',
            fieldName: 'user',
            fieldOptions: {
                is: `'${ctx.payload?.userId}'`
            }
        };

        const filters: Where = {
            AND: [
                fields
            ]
        }

        return filters;
    }

    async byCurrentUserAndNoFolder(ctx: MyContext): Promise<Where | undefined> {
        const userFields: Fields = {
            fieldTable: 'notes',
            fieldName: 'user',
            fieldOptions: {
                is: `'${ctx.payload?.userId}'`
            }
        };

        const folderFields: Fields = {
            fieldTable: 'notes',
            fieldName: 'folder',
            fieldOptions: {
                isNull: null
            }
        };

        const filters: Where = {
            AND: [
                userFields,
                folderFields
            ]
        }

        return filters;
    }

    async byFolder(folder: string): Promise<Where | undefined> {

        const fields: Fields = {
            fieldTable: 'notes',
            fieldName: 'folder',
            fieldOptions: {
                is: `'${folder}'`
            }
        };

        const filters: Where = {
            AND: [
                fields
            ]
        }

        return filters;
    }


    async byUserAndPlayer(user: string, player: number): Promise<Where | undefined> {
        const userFields: Fields = {
            fieldTable: 'notes',
            fieldName: 'user',
            fieldOptions: {
                is: `'${user}'`
            }
        };

        const playerFields: Fields = {
            fieldTable: 'notes',
            fieldName: 'player',
            fieldOptions: {
                is: player
            }
        };

        const filters: Where = {
            AND: [
                userFields,
                playerFields
            ]
        }

        return filters;
    }
}