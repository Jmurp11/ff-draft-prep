import { MiddlewareFn } from "type-graphql";
import { MyContext } from "../shared";
import { User } from "../entity/User";

export const isAdmin: MiddlewareFn<MyContext> = async ({ context }, next) => {
  const user = await User.findOne({
    where: {
      id: context.payload!.userId
    }
  });

  if (!user) {
    throw new Error("Not an Admin!");
  }

  if (!user!.isAdmin) {
    throw new Error("Not an Admin!");
  }

  return next();
};