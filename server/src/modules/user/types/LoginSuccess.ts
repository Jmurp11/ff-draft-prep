import { ObjectType, Field } from "type-graphql";
import { User } from "../../../entity";

@ObjectType()
export class LoginSuccess {
    @Field(() => User, { nullable: true })
    user?: User;

    @Field()
    accessToken: string;

    @Field()
    expiresIn: number;
}
