import { ObjectType, Field } from "type-graphql";
import { Response } from "../../../shared/Response";
import { User } from "../../../entity";

@ObjectType()
export class LoginResult {
    @Field(() => User, { nullable: true })
    user?: User;

    @Field(() => [Response], { nullable: true })
    errors?: Response[];
}
