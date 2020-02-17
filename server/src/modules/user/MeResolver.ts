import { Resolver, Query, Ctx } from 'type-graphql';
import { User } from '../../entity';
import { MyContext } from '../../types';


@Resolver()
export class MeResolver {
    @Query(() => User, { nullable: true })
    async me(@Ctx() ctx: MyContext): Promise<User | undefined> {
        console.log(ctx.req.session!.userId);
        if (!ctx.req.session!.userId) {
            console.log(ctx.req.session!.userId);
            return undefined;
        }

        return User.findOne({
            where: {
                id: ctx.req.session!.userId
            }
        });
    }
}