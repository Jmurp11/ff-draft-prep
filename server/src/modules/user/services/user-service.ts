import { Service } from 'typedi';
import { Fields, Where } from '../../../utils/filterQuery';


@Service()
export class UserService {
    async byId(id: string): Promise<Where | undefined> {
        const fields: Fields = {
            fieldTable: 'users',
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

    async byEmail(email: string): Promise<Where | undefined> {
        const fields: Fields = {
            fieldTable: 'users',
            fieldName: 'email',
            fieldOptions: {
                is: `'${email}'`
            }
        };

        const filters: Where = {
            AND: [
                fields
            ]
        }

        return filters;
    }

    async byUsername(username: string): Promise<Where | undefined> {
        const fields: Fields = {
            fieldTable: 'users',
            fieldName: 'username',
            fieldOptions: {
                is: `'${username}'`
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
            fieldTable: 'users',
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
}