import { Service } from 'typedi';
import { Fields, Where } from '../../../utils/filterQuery';


@Service()
export class DraftService {
    async byId(id: string): Promise<Where | undefined> {
        const fields: Fields = {
            fieldTable: 'drafts',
            fieldName: 'id',
            fieldOptions: {
                is: id
            }
        };

        const filters: Where = {
            AND: [
                fields
            ]
        }

        return filters;
    }

    async byType(type: string): Promise<Where | undefined> {
        const fields: Fields = {
            fieldTable: 'drafts',
            fieldName: 'type',
            fieldOptions: {
                is: `'${type}'`
            }
        };

        const filters: Where = {
            AND: [
                fields
            ]
        }

        return filters;
    }

    async byActive(isActive: boolean): Promise<Where | undefined> {
        const fields: Fields = {
            fieldTable: 'drafts',
            fieldName: 'isActive',
            fieldOptions: {
                is: isActive
            }
        };

        const filters: Where = {
            AND: [
                fields
            ]
        }

        return filters;
    }

    async byInactive(isActive: boolean): Promise<Where | undefined> {
        const fields: Fields = {
            fieldTable: 'drafts',
            fieldName: 'isActive',
            fieldOptions: {
                not: isActive
            }
        };

        const filters: Where = {
            AND: [
                fields
            ]
        }

        return filters;
    }

    async byNumOfTeams(numOfTeams: number): Promise<Where | undefined> {
        const fields: Fields = {
            fieldTable: 'drafts',
            fieldName: 'numOfTeams',
            fieldOptions: {
                is: numOfTeams
            }
        };

        const filters: Where = {
            AND: [
                fields
            ]
        }

        return filters;
    }

    async byTypeAndNumOfTeams(numOfTeams: number, type: string): Promise<Where | undefined> {
        const numOfTeamsFields: Fields = {
            fieldTable: 'drafts',
            fieldName: 'numOfTeams',
            fieldOptions: {
                is: numOfTeams
            }
        };

        const typeFields: Fields = {
            fieldTable: 'drafts',
            fieldName: 'type',
            fieldOptions: {
                is: `'${type}'`
            }
        };

        const filters: Where = {
            AND: [
                numOfTeamsFields,
                typeFields
            ]
        }

        return filters;
    }
}