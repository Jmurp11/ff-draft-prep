import { Service } from 'typedi';
import { Fields, Where } from '../../../utils/filterQuery';


@Service()
export class TeamService {
    async byId(id: number): Promise<Where | undefined> {
        const fields: Fields = {
            fieldTable: 'teams',
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

    async byCity(city: string): Promise<Where | undefined> {
        const fields: Fields = {
            fieldTable: 'teams',
            fieldName: 'city',
            fieldOptions: {
                is: `'${city}'`
            }
        };

        const filters: Where = {
            AND: [
                fields
            ]
        }

        return filters;
    }

    async byNickName(nickname: string): Promise<Where | undefined> {
        const fields: Fields = {
            fieldTable: 'teams',
            fieldName: 'nickname',
            fieldOptions: {
                is: `'${nickname}'`
            }
        };


        const filters: Where = {
            AND: [
                fields
            ]
        }

        return filters;
    }

    async byAbbreviation(abbreviation: string): Promise<Where | undefined> {
        const fields: Fields = {
            fieldTable: 'teams',
            fieldName: 'abbreviation',
            fieldOptions: {
                is: `'${abbreviation}'`
            }
        };

        const filters: Where = {
            AND: [
                fields
            ]
        }

        return filters;
    }

    async byConference(conference: string): Promise<Where | undefined> {
        const fields: Fields = {
            fieldTable: 'teams',
            fieldName: 'conference',
            fieldOptions: {
                is: `'${conference}'`
            }
        };

        const filters: Where = {
            AND: [
                fields
            ]
        }

        return filters;
    }

    async byDivision(conference: string, division: string): Promise<Where | undefined> {
        const conferenceFields: Fields = {
            fieldTable: 'teams',
            fieldName: 'conference',
            fieldOptions: {
                is: `'${conference}'`
            }
        };

        const divisionFields: Fields = {
            fieldTable: 'teams',
            fieldName: 'division',
            fieldOptions: {
                is: `'${division}'`
            }
        };

        const filters: Where = {
            AND: [
                conferenceFields,
                divisionFields
            ]
        }

        return filters;
    }
}