import { Service } from 'typedi';
import { Fields, Where } from '../../../utils/filterQuery';


@Service()
export class PlayerService {
    async byTeam(team: number): Promise<Where | undefined> {
        const fields: Fields = {
            fieldTable: 'players',
            fieldName: 'team',
            fieldOptions: {
                is: team
            }
        };

        const filters: Where = {
            AND: [
                fields
            ]
        }

        return filters;
    }

    async byId(id: number): Promise<Where | undefined> {
        const fields: Fields = {
            fieldTable: 'players',
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

    async byName(firstName: string, lastName: string): Promise<Where | undefined> {
        const lastNameFields: Fields = {
            fieldTable: 'players',
            fieldName: 'lastName',
            fieldOptions: {
                is: `'${lastName}'`
            }
        };

        const firstNameFields: Fields = {
            fieldTable: 'players',
            fieldName: 'firstName',
            fieldOptions: {
                is: `'${firstName}'`
            }
        };

        const filters: Where = {
            AND: [
                lastNameFields,
                firstNameFields
            ]
        }

        return filters;
    }

    async byPosition(position: string): Promise<Where | undefined> {
        const fields: Fields = {
            fieldTable: 'players',
            fieldName: 'position',
            fieldOptions: {
                is: `'${position}'`
            }
        };

        const filters: Where = {
            AND: [
                fields
            ]
        }

        return filters;
    }

    async byStatus(status: string): Promise<Where | undefined> {
        const fields: Fields = {
            fieldTable: 'players',
            fieldName: 'status',
            fieldOptions: {
                is: `'${status}'`
            }
        };

        const filters: Where = {
            AND: [
                fields
            ]
        }

        return filters;
    }

    async byNotStatus(status: string): Promise<Where | undefined> {
        const fields: Fields = {
            fieldTable: 'players',
            fieldName: 'status',
            fieldOptions: {
                not: `'${status}'`
            }
        };

        const filters: Where = {
            AND: [
                fields
            ]
        }

        return filters;
    }

    async byDepthChart(team: number, position: string): Promise<Where | undefined> {
        const teamFields: Fields = {
            fieldTable: 'players',
            fieldName: 'team',
            fieldOptions: {
                is: team
            }
        };

        const positionFields: Fields = {
            fieldTable: 'players',
            fieldName: 'position',
            fieldOptions: {
                is: `'${position}'`
            }
        };

        const filters: Where = {
            AND: [
                teamFields,
                positionFields
            ]
        }

        return filters;
    }

    async byNameAndPosition(firstName: string, lastName: string, position: string): Promise<Where | undefined> {
        const lastNameFields: Fields = {
            fieldTable: 'players',
            fieldName: 'lastName',
            fieldOptions: {
                is: `'${lastName}'`
            }
        };

        const firstNameFields: Fields = {
            fieldTable: 'players',
            fieldName: 'firstName',
            fieldOptions: {
                is: `'${firstName}'`
            }
        };

        const positionFields: Fields = {
            fieldTable: 'players',
            fieldName: 'position',
            fieldOptions: {
                is: `'${position}'`
            }
        };

        const filters: Where = {
            AND: [
                lastNameFields,
                firstNameFields,
                positionFields
            ]
        }

        return filters;
    }
}