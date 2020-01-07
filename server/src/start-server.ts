import "reflect-metadata";
import { GraphQLServer, PubSub } from "graphql-yoga";
import * as session from "express-session";
import * as connectRedis from "connect-redis";
import * as RateLimit from "express-rate-limit";
import * as RateLimitRedisStore from "rate-limit-redis";
import chalk from 'chalk';
import { redis } from "./redis";
import { createTypeormConn, genSchema } from "./utils";
import { confirmEmail } from "./routes/confirmEmail";
import { redisSessionPrefix } from "./constants/constants";
import { createTestConn } from "./testSetup/createTestConn";
import { userLoader } from "./loaders/UserLoader";

const SESSION_SECRET = "temporarySessionSecret";
const RedisStore = connectRedis(session as any);

export const startServer = async () => {
  if (process.env.NODE_ENV === "test") {
    await redis.flushall();
  }

  const pubsub = new PubSub();

  const server = new GraphQLServer({
    schema: genSchema(),
    context: ({ request }) => ({
      redis,
      url: request ? request.protocol + "://" + request.get("host"): '',
      session: request ? request.session : undefined,
      req: request,
      pubsub,
      userLoader: userLoader()
    })
  });

  server.express.use(
    new RateLimit({
      store: new RateLimitRedisStore({
        client: redis
      }),
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 1000 // limit each IP to 1000 requests per windowMs
    })
  );

  server.express.use(
    session({
      store: new RedisStore({
        client: redis as any,
        prefix: redisSessionPrefix
      }),
      name: "uid",
      secret: SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 1000 * 60 * 60 * 24 * 7 // 7 days
      }
    } as any)
  );

  const cors = {
    credentials: true,
    origin:
      process.env.NODE_ENV === "test"
        ? "*"
        : '*' // (process.env.FRONTEND_HOST as string) 
        // TODO: Change the above line back in prod
  };

  server.express.get("/confirm/:id", confirmEmail);

  if (process.env.NODE_ENV === "test") {
    await createTestConn(true);
  } else {
    await createTypeormConn();
  }
  const app = await server.start({
    cors,
    port: process.env.NODE_ENV === "test" ? 0 : 4000
  });

  console.log(chalk.magentaBright('🏈  Draft Shark server is running on ') + chalk.greenBright('localhost:4000') + chalk.magentaBright('...'));

  return app;
};