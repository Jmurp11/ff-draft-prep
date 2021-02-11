import { logger } from '../../middleware';
import { Resolver, Query, Ctx, UseMiddleware } from 'type-graphql';
import { User } from '../../entity/User';
import { MyContext } from '../../shared';
import { verify } from 'jsonwebtoken';

@Resolver()
export class MeResolver {
  @UseMiddleware(logger)
  @Query(() => User, { nullable: true })
  async me(@Ctx() ctx: MyContext): Promise<User | undefined> {
    const accessToken = ctx.req.cookies['access-token'];
    const refreshToken = ctx.req.cookies['refresh-token'];

    if (!accessToken && !refreshToken) {
      return undefined;
    }

    try {
      const payload = verify(accessToken, process.env.ACCESS_TOKEN_SECRET!) as any;
      ctx.payload = payload;
    } catch { }

    if (!refreshToken) {
      return undefined;
    }

    try {
      const payload = verify(refreshToken, process.env.REFRESH_TOKEN_SECRET!) as any;
      ctx.payload = payload;
    } catch {
      return undefined;
    }

    const user = await User.findOne(ctx.payload?.userId);

    if (!user) {
      return undefined;
    }

    return User.findOne({
      where: {
        id: user.id
      }
    });
  }
}
