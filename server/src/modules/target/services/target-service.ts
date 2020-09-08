import { Service } from 'typedi';
import { Fields, Where } from '../../../utils/filterQuery';
import { Ctx } from 'type-graphql';
import { MyContext } from '../../../shared';


@Service()
export class TargetService {
    async byPlayer(player: number): Promise<Where | undefined> {
        const fields: Fields = {
            fieldTable: 'targets',
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

    async byUser(user: string): Promise<Where | undefined> {
        const fields: Fields = {
            fieldTable: 'targets',
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

    async byCurrentUser(@Ctx() ctx: MyContext): Promise<Where | undefined> {
        const fields: Fields = {
            fieldTable: 'targets',
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

    async byUserAndPlayer(user: string, player: number): Promise<Where | undefined> {
        const userFields: Fields = {
            fieldTable: 'targets',
            fieldName: 'user',
            fieldOptions: {
                is: `'${user}'`
            }
        };

        const playerFields: Fields = {
            fieldTable: 'targets',
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