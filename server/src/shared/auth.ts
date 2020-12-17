import { Secret, sign } from 'jsonwebtoken';
import { User } from '../entity/User'

export const createTokens = (user: User) => {
    const accessTokenSecret: Secret = process.env.ACCESS_TOKEN_SECRET!;

    const refreshTokenSecret: Secret = process.env.REFRESH_TOKEN_SECRET!;

    const refreshToken = sign(
        {
            userId: user?.id
        },
        refreshTokenSecret,
        {
            expiresIn: '7d'
        });

    const accessToken = sign(
        {
            userId: user?.id,
            email: user?.email,
            username: user?.username,
            isAdmin: user?.isAdmin
        },
        accessTokenSecret,
        {
            expiresIn: '15min'
        });

    return { accessToken, refreshToken };
}

export const getTokenExpiration = () => {
    const accessExpires = new Date(new Date().getTime() + (1000 * 60 * 15));
    const refreshExpires = new Date(new Date().getTime() + (1000 * 60 * 60 * 24 * 7));

    return { accessExpires, refreshExpires };
}