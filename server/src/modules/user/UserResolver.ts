import 'dotenv/config';
import { Resolver, Query, Mutation, Arg, Ctx, UseMiddleware } from 'type-graphql';
import bcrypt from 'bcryptjs';
import { v4 } from 'uuid';
import { User } from '../../entity/User';
import { RegisterInput, LoginInput, AdminInput } from './inputs';
import { Result } from '../../shared';
import { registerSuccess, loginFailed, forgotPasswordLockError } from './messages/messages';
import { MyContext } from '../../shared';
import { isAuth, logger, isAdmin } from '../../middleware';
import { sendEmail } from '../../utils';
import { redis } from '../../redis';
import { baseUrl, forgotPasswordPrefix, confirmationPrefix } from '../../constants/constants';
import { ChangePasswordInput } from './inputs/ChangePasswordInput';
import { LoginResult } from './types/LoginResult';
import { SelectQueryBuilder, getRepository } from 'typeorm';
import { UpdateImageInput } from './inputs/UpdateImageInput';
import { UserArgs } from './inputs/UserArgs';
import { UserService } from './services/user-service';
import { filterQuery } from '../../utils/filterQuery';
import { createTokens, getTokenExpiration } from '../../shared/auth';

@Resolver()
export class UserResolver {
    constructor(
        private _users: UserService
    ) { }

    @UseMiddleware(logger)
    @Query(() => [User])
    async users(
        @Arg('input') {
            filterType,
            user,
            take,
            skip
        }: UserArgs
    ) {
        let where;

        const query: SelectQueryBuilder<User> = getRepository(User)
            .createQueryBuilder('users')
            .leftJoinAndSelect('user.folders', 'folders')
            .take(take)
            .skip(skip)
            .orderBy('users.username', 'ASC');

        if (filterType) {
            where = await this._users.byUser(user);
            return filterQuery(query, where).getMany();
        } else {
            return query.getMany();
        }
    }

    @UseMiddleware(isAuth, logger)
    @Query(() => User)
    async user(
        @Arg('input') {
            filterType,
            id,
            username,
            email
        }: UserArgs
    ) {
        let where;

        const query: SelectQueryBuilder<User> = getRepository(User)
            .createQueryBuilder('users')
            .leftJoinAndSelect('user.folders', 'folders')
            .leftJoinAndSelect('user.folders.notes', 'folders')

        switch (filterType) {
            case 'byId':
                where = await this._users.byId(id);
                return filterQuery(query, where).getOne();
            case 'byEmail':
                where = await this._users.byEmail(email);
                return filterQuery(query, where).getOne();
            case 'byUsername':
                where = await this._users.byUsername(username);
                return filterQuery(query, where).getOne();
            default:
                return null;
        }
    }

    @Mutation(() => Result)
    async register(
        @Arg('input') { email, password, username, profileImage }: RegisterInput
    ): Promise<Result> {

        const creationTime = new Date().toISOString();

        const user = await User.create({
            email,
            password,
            username,
            profileImage,
            creationTime,
            lastLoggedIn: creationTime
        }).save();

        console.log(user);

        // await sendEmail(email, await createConfirmationUrl(user.id), 'Confirm');

        return {
            success: [
                {
                    path: 'register',
                    message: registerSuccess
                }
            ]
        }
    }

    @Mutation(() => LoginResult, { nullable: true })
    async login(
        @Arg('input') {
            email,
            username,
            password
        }: LoginInput,
        @Ctx() { res }: MyContext
    ): Promise<LoginResult> {
        let user = await User.findOne({
            where: [
                { email },
                { username }
            ]
        });

        if (!user) {
            return {
                errors: [
                    {
                        path: 'login',
                        message: loginFailed
                    }
                ]
            }
        }

        const valid = await bcrypt.compare(password, user.password);

        if (!valid) {
            return {
                errors: [
                    {
                        path: 'login',
                        message: loginFailed
                    }
                ]
            }
        }
        /**
                if (!user.confirmed) {
                    return {
                        errors: [
                            {
                                path: 'login',
                                message: confirmEmailError
                            }
                        ]
                    }
                }
        */
        if (user.forgotPasswordLock) {
            return {
                errors: [
                    {
                        path: 'login',
                        message: forgotPasswordLockError
                    }
                ]
            }
        }

        const logInTime = new Date().toISOString();

        await User.update({ id: user.id }, {
            lastLoggedIn: logInTime,
            isLoggedIn: true
        });

        user = await User.findOne({
            where: {
                email
            }
        });

        const tokens = createTokens(user!);

        const tokenExpirationDates = getTokenExpiration();

        res.cookie('access-token', tokens.accessToken, { expires: tokenExpirationDates.accessExpires });
        res.cookie('refresh-token', tokens.refreshToken, { expires: tokenExpirationDates.refreshExpires });

        return {
            success: {
                user,
                message: `Welcome back, ${user?.username}!`
            }
        };
    }

    @UseMiddleware(isAuth, isAdmin, logger)
    @Mutation(() => Result)
    async updateAdminStatus(
        @Arg('input') { id, isAdmin }: AdminInput
    ): Promise<Result> {
        const result = await User.update({ id }, { isAdmin });

        if (result.affected !== 1) {
            return {
                errors: [
                    {
                        path: 'admin',
                        message: 'Something went wrong! User was not made an admin!'
                    }
                ]
            }
        }

        return {
            success: [
                {
                    path: 'admin',
                    message: 'User is now an admin!'
                }
            ]
        }
    }

    @Mutation(() => Result)
    async confirmUser(
        @Arg('token') token: string
    ): Promise<Result> {
        const userId = await redis.get(`${confirmationPrefix}${token}`);

        if (!userId) {
            return {
                errors: [
                    {
                        path: 'confirm user',
                        message: 'User not found in store!'
                    }
                ]
            }
        }

        await User.update({ id: userId }, { confirmed: true });

        await redis.del(token);

        return {
            success: [
                {
                    path: 'confirm user',
                    message: 'User confirmed!'
                }
            ]
        }
    }

    @Mutation(() => Result)
    async forgotPassword(
        @Arg('email') email: string
    ): Promise<Result> {
        const user = await User.findOne({
            where: {
                email
            }
        });

        if (!user) {
            return {
                errors: [
                    {
                        path: 'forgot password',
                        message: 'User not found!'
                    }
                ]
            }
        }

        await User.update({ email }, { forgotPasswordLock: true });

        const token = v4();
        await redis.set(`${forgotPasswordPrefix}${token}`, user.id, "ex", 60 * 60 * 24) // 1 day expiration

        await sendEmail(email, `${baseUrl}/a/change-password/${token}`, 'Forgot Password');

        return {
            success: [
                {
                    path: 'forgot password',
                    message: 'Check email for a link to reset your password!'
                }
            ]
        }
    }

    @Mutation(() => Result)
    async changePassword(
        @Arg('input') { token, password }: ChangePasswordInput
    ): Promise<Result> {
        const userId = await redis.get(`${forgotPasswordPrefix}${token}`);

        if (!userId) {
            return {
                errors: [
                    {
                        path: 'change password',
                        message: 'User not found or bad token!'
                    }
                ]
            }
        }

        const user = await User.findOne({
            where: {
                id: userId
            }
        })

        if (!user) {
            return {
                errors: [
                    {
                        path: 'change password',
                        message: 'User not found!'
                    }
                ]
            }
        }

        await redis.del(`${forgotPasswordPrefix}${token}`);

        user.password = await bcrypt.hash(password, 12);

        user.save();

        await User.update({ id: userId }, { forgotPasswordLock: false });

        return {
            success: [
                {
                    path: 'change password',
                    message: 'Password updated successfully!'
                }
            ]
        }
    }

    @Mutation(() => Boolean)
    async logout(
        @Ctx() { res, payload }: MyContext
    ) {
        await User.update(
            { id: payload?.userId },
            { isLoggedIn: false }
        );

        res.clearCookie('access-token');
        res.clearCookie('refresh-token');

        return true;
    };


    @UseMiddleware(isAuth, logger)
    @Mutation(() => Result)
    async updateUserProfileImage(
        @Arg('input') {
            id,
            image
        }: UpdateImageInput
    ): Promise<Result> {
        const result = await User.update({ id }, { profileImage: image });

        if (result.affected !== 1) {
            return {
                errors: [
                    {
                        path: 'edit',
                        message: 'Something went wrong! Edit did not save correctly!'
                    }
                ]
            }
        }

        return {
            success: [
                {
                    path: 'edit',
                    message: 'Profile Image updated!'
                }
            ]
        }
    }
}
