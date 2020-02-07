import { Resolver, Query, Mutation, Arg, Ctx, UseMiddleware } from 'type-graphql';
import bcrypt from 'bcryptjs';
import { User } from '../../entity';
import { RegisterInput, LoginInput, AdminInput } from './inputs';
import { Result } from '../../types';
import { registerSuccess, loginFailed, loginSuccess, confirmEmailError, /* forgotPasswordLockError */ } from './messages';
import { MyContext } from '../../types';
import { isAuth, logger, isAdmin } from '../../middleware';
import { sendEmail } from '../../utils';

@Resolver()
export class UserResolver {
    @UseMiddleware(isAuth, logger)
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

    @UseMiddleware(isAuth, logger)
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

        await sendEmail(email, user.id);

        return {
            success: [
                {
                    path: 'register',
                    message: registerSuccess
                }
            ]
        }
    }

    @Mutation(() => Result, { nullable: true })
    async login(
        @Arg('input') { email, password }: LoginInput,
        @Ctx() ctx: MyContext
    ): Promise<Result> {
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

        ctx.req.session!.userId = user!.id;

        return {
            success: [
                {
                    path: 'login',
                    message: loginSuccess
                }
            ]
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
}