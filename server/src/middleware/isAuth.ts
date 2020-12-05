import { MiddlewareFn } from "type-graphql";
import { verify } from 'jsonwebtoken';
import { MyContext } from "../shared";
import { createTokens, getTokenExpiration } from "../shared/auth";
import { User } from "../entity/User";

export const isAuth: MiddlewareFn<MyContext> = async ({ context }, next) => {
  const accessToken = context.req.cookies['access-token'];
  const refreshToken = context.req.cookies['refresh-token'];

  if (!accessToken && !refreshToken) {
    throw new Error('not authenticated');
  }

  try {
    const payload = verify(accessToken, process.env.ACCESS_TOKEN_SECRET!) as any;
    context.payload = payload;
  } catch { }

  if (!refreshToken) {
    throw new Error('not authenticated');
  }

  try {
    const payload = verify(refreshToken, process.env.REFRESH_TOKEN_SECRET!) as any;
    context.payload = payload;
  } catch {
    throw new Error('not authenticated');
  }

  const user = await User.findOne(context.payload?.userId);

  const tokens = createTokens(user!);

  const tokenExpirationDates = getTokenExpiration();

  context.res.cookie('access-token', tokens.accessToken, { expires: tokenExpirationDates.accessExpires });
  context.res.cookie('refresh-token', tokens.refreshToken, { expires: tokenExpirationDates.refreshExpires });


  return next();
};