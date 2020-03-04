import { MiddlewareFn } from "type-graphql";

import { MyContext } from "../shared";

export const logger: MiddlewareFn<MyContext> = async ({ args }, next) => {
  console.log("args: ", args);

  return next();
};