import { Resolver, Query, Ctx } from 'type-graphql';
import { verify } from 'jsonwebtoken';
import { User } from '../../entity';
import { MyContext } from '../../shared';


@Resolver()
export class MeResolver {
    @Query(() => User, { nullable: true })
    async me(@Ctx() ctx: MyContext): Promise<User | undefined> {
        const authorization = ctx.req.headers['authorization'];

        if (!authorization) {
            return undefined;
        }

        try {
            const token = authorization.split(" ")[1];
            const payload: any = verify(token, process.env.ACCESS_TOKEN_SECRET!);
            return User.findOne({
                relations: [
                    'likes',
                    'likes.user',
                    'likes.note',
                    'notes',
                    'shares',
                    'targets',
                    'ranks'
                ],
                where: {
                    id: payload.userId
                }
            });
        } catch (err) {
            console.log(err);
            return undefined;
        }
    }
}