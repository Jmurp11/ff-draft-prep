import { Service } from 'typedi';
import { Fields, Where } from '../../../utils/filterQuery';


@Service()
export class DraftPickService {
    async byId(id: string): Promise<Where | undefined> {
        const fields: Fields = {
            fieldTable: 'draft-picks',
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

    async byDraft(draft: string): Promise<Where | undefined> {
        const fields: Fields = {
            fieldTable: 'draft-picks',
            fieldName: 'draft',
            fieldOptions: {
                is: `'${draft}'`
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
            fieldTable: 'draft-picks',
            fieldName: 'user',
            fieldOptions: {
                is: user
            }
        };

        const filters: Where = {
            AND: [
                fields
            ]
        }

        return filters;
    }

    async byPlayer(player: number): Promise<Where | undefined> {
        const fields: Fields = {
            fieldTable: 'draft-picks',
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
}