import 'dotenv/config';
import 'reflect-metadata';
import http from 'http';
import { createConnection, getConnectionOptions } from 'typeorm';
import express from 'express';
import chalk from 'chalk'
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import session from 'express-session';
import connectRedis from 'connect-redis';
import cookieParser from 'cookie-parser';
import { verify } from 'jsonwebtoken';
import { redis } from './redis';
import { redisSessionPrefix, baseUrl } from './constants/constants';
import { User } from './entity';
import { createAccessToken, createRefreshToken } from './shared/auth';
import { sendRefreshToken } from './shared/sendRefreshToken';
import Container from './container';

(async () => {
  const app = express();

  const corOptions = {
    credentials: true,
    origin: [baseUrl]
  };
  
  app.use(cookieParser());
  app.post('/refresh_token', async (req, res) => {
    const token = req.cookies.uid;


    if (!token) {
      return res.send({
        ok: false,
        accessToken: ''
      });
    }

    let payload: any = null;

    try {
      payload = verify(token, process.env.REFRESH_TOKEN_SECRET!);
    } catch(err) {
      console.log(err);
      return res.send({
        ok: false,
        accessToken: ''
      });
    }

    const user = await User.findOne({
      where: {
        id: payload.userId
      }
    });

    if (!user) {
      return res.send({
        ok: false,
        accessToken: ''
      });
    }
    
    if (user.tokenVersion !== payload.tokenVersion) {
      return res.send({
        ok: false,
        accessToken: ''
      });
    }

    sendRefreshToken(res, createRefreshToken(user));

    return res.send({
      ok: true,
      accessToken: createAccessToken(user)
    });
  });

  const SESSION_SECRET = "temporarySessionSecret";

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

  const RedisStore = connectRedis(session);

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

  apolloServer.applyMiddleware({ app, cors: corOptions });

  const httpServer = http.createServer(app);
  apolloServer.installSubscriptionHandlers(httpServer);


  const port = process.env.PORT || 4000;

  httpServer.listen(port, async () => {
    console.log(chalk.magentaBright('🏈  Draft Shark server is running on ') + chalk.greenBright('127.0.0.1:4000') + chalk.magentaBright('...'));
  });
})();
