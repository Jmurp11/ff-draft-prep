import { Secret, sign } from 'jsonwebtoken';
import { User } from '../entity'

export const createAccessToken = (user: User) => {
    const accessTokenSecret: Secret = process.env.ACCESS_TOKEN_SECRET!;

    return sign(
        {
            userId: user?.id
        },
        accessTokenSecret,
        {
            expiresIn: '15min'
        });
}

export const createRefreshToken = (user: User) => {
    const refreshTokenSecret: Secret = process.env.REFRESH_TOKEN_SECRET!;

    return sign(
        {
            userId: user?.id
        },
        refreshTokenSecret,
        {
            expiresIn: '7d'
        });
}
