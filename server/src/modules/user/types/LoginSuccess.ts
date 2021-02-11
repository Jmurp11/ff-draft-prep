import { ObjectType, Field } from "type-graphql";
import { User } from "../../../entity/User";

@ObjectType()
export class LoginSuccess {
    @Field(() => User, { nullable: true })
    user?: User;

    @Field()
    message: string;
}
