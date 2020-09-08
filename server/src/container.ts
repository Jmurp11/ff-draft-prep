import { Container } from 'typedi';

Container.set('Config', {
    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
    REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
    FRONTEND_HOST: process.env.FRONTEND_HOST,
    SPORTS_DATA_KEY: process.env.SPORTS_DATA_KEY
});

export default Container;