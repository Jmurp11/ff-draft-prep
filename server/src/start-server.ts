import { GraphQLServer } from 'graphql-yoga';
import { importSchema } from 'graphql-import';
import chalk from 'chalk';
import { createTypeormConn } from './utils/createTypeOrmConn';
import { resolvers } from './resolver';

export const startServer = async () => {
    const typeDefs = importSchema('./src/schema.graphql');
    const server = new GraphQLServer({ typeDefs, resolvers })

    await createTypeormConn();

    const app = await server.start({
        port: process.env.NODE_ENV === 'test' ? 0 : 4000
    });

    console.log(chalk.magentaBright('🏒  Tenders server is running on ') + chalk.greenBright('localhost:4000') + chalk.magentaBright('...'));

    return app;
};