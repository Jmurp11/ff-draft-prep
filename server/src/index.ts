import 'dotenv/config';
import 'reflect-metadata';
import http from 'http';
import { createConnection, getConnectionOptions } from 'typeorm';
import express from 'express';
import chalk from 'chalk'
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import cookieParser from 'cookie-parser';
import { baseUrl } from './constants/constants';
import Container from './container';

(async () => {
  const app = express();

  const corOptions = {
    credentials: true,
    origin: [baseUrl]
  };

  app.use(cookieParser());

  const options = await getConnectionOptions(
    process.env.NODE_ENV || 'development'
  );

  await createConnection({ ...options, name: 'default' });

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [`${__dirname}/modules/**/*.ts`],
      authChecker: ({ context: { req } }) => {
        return !!req.session.userId;
      },
      container: Container,
      dateScalarMode: "isoDate"
    }),
    context: ({ req, res }) => ({ req, res })
  });

  apolloServer.applyMiddleware({ app, cors: corOptions });

  const httpServer = http.createServer(app);
  apolloServer.installSubscriptionHandlers(httpServer);


  const port = process.env.PORT || 4000;

  httpServer.listen(port, async () => {
    console.log(chalk.magentaBright('🏈  Draft Shark server is running on ') + chalk.greenBright('127.0.0.1:4000') + chalk.magentaBright('...'));
  });
})();
