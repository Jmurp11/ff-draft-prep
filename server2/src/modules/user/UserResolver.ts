import { Resolver, Query, Mutation, Arg, Ctx } from 'type-graphql';
import bcrypt from 'bcryptjs';
import { User } from '../../entity';
import { RegisterInput, LoginInput } from './inputs';
import { Result } from '../../types';
import { registerSuccess, loginFailed, /* confirmEmailError, forgotPasswordLockError */ } from './messages';
import { UserResponse } from './UserResponse';
import { MyContext } from '../../types';

@Resolver()
export class UserResolver {
    @Query(() => [User])
    async users() {
        return User.find();
    }

    @Query(() => User)
    async user(@Arg('id') id: string) {
        return User.findOne({
            where: {
                id
            }
        });
    }

    @Query(() => User)
    async userByUsername(@Arg('username') username: string) {
        return User.findOne({
            where: {
                username
            }
        });
    }

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
        const hashedPassword = await bcrypt.hash(password, 12);

        const creationTime = new Date().toISOString();
        console.log(creationTime);
        await User.create({
            email,
            password: hashedPassword,
            username,
            creationTime,
            lastLoggedIn: creationTime
        }).save();

        return {
            success: [
                {
                    path: 'register',
                    message: registerSuccess
                }
            ]
        }
    }

    @Mutation(() => User, { nullable: true })
    async login(
        @Arg('input') { email, password }: LoginInput,
        @Ctx() ctx: MyContext
    ): Promise<UserResponse> {
        const user = await User.findOne({
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

        ctx.req.session!.user = user;
        
        const logInTime = new Date().toISOString();

        await User.update({ id: user.id }, { lastLoggedIn: logInTime});

        return ctx.req.session!.user;
    }
}