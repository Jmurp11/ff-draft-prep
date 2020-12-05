import { MiddlewareFn } from "type-graphql";
import { verify } from 'jsonwebtoken';
import { MyContext } from "../shared";

export const isAuth: MiddlewareFn<MyContext> = async ({ context }, next) => {
  const token = context.req.cookies['access-token'];

  if (!token) {
    throw new Error('not authenticated');
  }

  try {
    const payload = verify(token, process.env.ACCESS_TOKEN_SECRET!) as any;
    context.payload = payload;
  } catch (err) { }
  return next();
};