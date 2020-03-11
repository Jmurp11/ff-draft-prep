import { Resolver, Query, Mutation, Arg, Ctx, UseMiddleware } from 'type-graphql';
import bcrypt from 'bcryptjs';
import { v4 } from 'uuid';
import { User } from '../../entity';
import { RegisterInput, LoginInput, AdminInput, LogoutInput } from './inputs';
import { Result } from '../../shared';
import { registerSuccess, loginFailed, confirmEmailError, forgotPasswordLockError } from './messages/messages';
import { MyContext } from '../../shared';
import { isAuth, logger, isAdmin } from '../../middleware';
import { sendEmail, createConfirmationUrl } from '../../utils';
import { redis } from '../../redis';
import { baseUrl, forgotPasswordPrefix, confirmationPrefix } from '../../constants/constants';
import { ChangePasswordInput } from './inputs/ChangePasswordInput';
import { LoginResult } from './types/LoginResult';
import { createAccessToken, createRefreshToken } from '../../shared/auth';
import { sendRefreshToken } from '../../shared/sendRefreshToken';

@Resolver()
export class UserResolver {
    @UseMiddleware(isAuth, isAdmin, logger)
    @Query(() => [User])
    async users() {
        return User.find();
    }

    @UseMiddleware(isAuth, logger)
    @Query(() => User)
    async user(@Arg('id') id: string) {
        return User.findOne({
            where: {
                id
            }
        });
    }

    @UseMiddleware(isAuth, logger)
    @Query(() => User)
    async userByUsername(@Arg('username') username: string) {
        return User.findOne({
            where: {
                username
            }
        });
    }

    @UseMiddleware(logger)
    @Query(() => User)
    async userByEmail(@Arg('email') email: string) {
        return User.findOne({
            where: {
                email
            }
        });
    }

    @Mutation(() => Result)
    async register(
        @Arg('input') { email, password, username }: RegisterInput
    ): Promise<Result> {
        const creationTime = new Date().toISOString();

        const user = await User.create({
            email,
            password,
            username,
            creationTime,
            lastLoggedIn: creationTime
        }).save();

        await sendEmail(email, await createConfirmationUrl(user.id), 'Confirm');

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
        @Arg('input') { email, password }: LoginInput,
        @Ctx() { res }: MyContext
    ): Promise<LoginResult> {
        let user = await User.findOne({
            where: {
                email
            }
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

        sendRefreshToken(res, createRefreshToken(user!));

        return {
            success: {
                user,
                accessToken: createAccessToken(user!)
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

        await sendEmail(email, `${baseUrl}user/change-password/${token}`, 'Forgot Password');

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
        @Arg('input') { userId }: LogoutInput,
        @Ctx() { res }: MyContext
    ) {
        await User.update(
            { id: userId },
            { isLoggedIn: false }
        );

        sendRefreshToken(res, "");

        return true;
    };
}