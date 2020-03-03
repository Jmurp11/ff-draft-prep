import { Resolver, Query, Ctx } from 'type-graphql';
import { User } from '../../entity';
import { MyContext } from '../../shared';


@Resolver()
export class MeResolver {
    @Query(() => User, { nullable: true })
    async me(@Ctx() ctx: MyContext): Promise<User | undefined> {
        if (!ctx.req.session!.user.id) {
            return undefined;
        }

        return User.findOne({
            where: {
                id: ctx.req.session!.user.id
            }
        });
    }
}