import { User } from "../entity/index"
import { removeAllUsersSessions } from "./removeUserSessions";
import { Redis } from "ioredis";

export const forgotPasswordLockAccount = async (userId: string, redis: Redis) => {
  await User.update({ id: userId }, { forgotPasswordLock: true });

  await removeAllUsersSessions(userId, redis);
}