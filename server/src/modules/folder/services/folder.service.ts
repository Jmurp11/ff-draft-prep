import { Service } from 'typedi';
import { Fields, Where } from '../../../utils/filterQuery';
import { MyContext } from '../../../shared';


@Service()
export class FolderService {
    async byId(id: string): Promise<Where | undefined> {
        const fields: Fields = {
            fieldTable: 'folders',
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
            fieldTable: 'folders',
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
            fieldTable: 'folders',
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

    async byTitle(title: string): Promise<Where | undefined> {
        const fields: Fields = {
            fieldTable: 'folders',
            fieldName: 'title',
            fieldOptions: {
                is: `'${title}'`
            }
        };


        const filters: Where = {
            AND: [
                fields
            ]
        }

        return filters;
    }
}