import { Resolver, Query, Mutation, Arg, Ctx } from 'type-graphql';
import bcrypt from 'bcryptjs';
import { User } from '../../entity';
import { RegisterInput, LoginInput } from './inputs';
import { Result } from '../../types';
import { registerSuccess, loginFailed, /* confirmEmailError, forgotPasswordLockError */ } from './messages';
import { UserResponse } from './UserResponse';
import { MyContext } from '../../types';

@Resolver(User)
export class UserResolver {
    @Query(() => [User])
    async users(): Promise<User[]> {
        return User.find();
    }

    @Query(() => User)
    async user(@Arg('id') id: string): Promise<User | undefined> {
        return User.findOne({
            where: {
                id
            }
        });
    }

    @Query(() => User)
    async userByUsername(@Arg('username') username: string): Promise<User | undefined> {
        return User.findOne({
            where: {
                username
            }
        });
    }

    @Query(() => User)
    async userByEmail(@Arg('email') email: string): Promise<User | undefined> {
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

        await User.create({
            email,
            password: hashedPassword,
            username
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
        
        return ctx.req.session!.user;
    }
}