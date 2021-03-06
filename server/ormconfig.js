module.exports = [
  {
    name: 'production',
    type: process.env.DB_TYPE,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DB,
    synchronize: true,
    logging: false,
    dropSchema: false,
    entities: [
       "src/entity/**/*.ts"
    ],
    migrations: [
       "src/migration/**/*.ts"
    ],
    subscribers: [
       "src/subscriber/**/*.ts"
    ],
    cli: {
       entitiesDir: "src/entity",
       migrationsDir: "src/migration",
       subscribersDir: "src/subscriber"
    }
  },
  {
    name: 'development',
    type: 'postgres',
    host: '127.0.0.1',
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    database: 'ff-draft-prep-dev',
    synchronize: true,
    logging: false,
    dropSchema: false,
    entities: [
    "src/entity/**/*.ts"
    ],
    migrations: [
       "src/migration/**/*.ts"
    ],
    subscribers: [
       "src/subscriber/**/*.ts"
    ],
    cli: {
       entitiesDir: "src/entity",
       migrationsDir: "src/migration",
       subscribersDir: "src/subscriber",
    }
  }
];
