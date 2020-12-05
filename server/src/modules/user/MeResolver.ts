import { isAuth, logger } from '../../middleware';
import { Resolver, Query, Ctx, UseMiddleware } from 'type-graphql';
import { User } from '../../entity';
import { MyContext } from '../../shared';


@Resolver()
export class MeResolver {
    @UseMiddleware(isAuth, logger)
    @Query(() => User, { nullable: true })
    async me(@Ctx() ctx: MyContext): Promise<User | undefined> {
        const user = ctx.payload?.userId;

        if (!user) {
            return undefined;
        }

        return User.findOne({
            relations: [
                'score',
                'score.user',
                'score.note',
                'notes',
                'targets'
            ],
            where: {
                id: user
            }
        });
    }
}