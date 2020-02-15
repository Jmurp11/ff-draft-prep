import 'reflect-metadata';
import http from 'http';
import { createConnection, getConnectionOptions } from 'typeorm';
import express from 'express';
import chalk from 'chalk'
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import session from 'express-session';
import connectRedis from 'connect-redis';
import { redis } from './redis';
import { redisSessionPrefix } from './constants/constants';

(async () => {
  const app = express();

  const SESSION_SECRET = "temporarySessionSecret";

  const options = await getConnectionOptions(
    process.env.NODE_ENV || 'development'
  );

  await createConnection({ ...options, name: 'default' });

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [`${__dirname}/modules/**/*.ts`],
      authChecker: ({ context: { req } }, roles) => {
        return !!req.session.userId;
      },
      dateScalarMode: "isoDate"
    }),
    context: ({ req, res }) => ({ req, res })
  });

  const RedisStore = connectRedis(session);

  const cors = {
    credentials: true,
    origin:
      process.env.NODE_ENV === "test"
        ? "*"
        : '*' // (process.env.FRONTEND_HOST as string) 
    // TODO: Change the above line back in prod
  };

  app.use(
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
    })
  );

  apolloServer.applyMiddleware({ app, cors });

  const httpServer = http.createServer(app);
  apolloServer.installSubscriptionHandlers(httpServer);


  const port = process.env.PORT || 4000;

  httpServer.listen(port, async () => {
    console.log(chalk.magentaBright('🏈  Draft Shark server is running on ') + chalk.greenBright('localhost:4000') + chalk.magentaBright('...'));
  });
})();
