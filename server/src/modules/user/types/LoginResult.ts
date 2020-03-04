import { ObjectType, Field } from "type-graphql";
import { Response } from "../../../shared/Response";
import { LoginSuccess } from './LoginSuccess';

@ObjectType()
export class LoginResult {
    @Field(() => LoginSuccess, { nullable: true })
    success?: LoginSuccess;

    @Field(() => [Response], { nullable: true })
    errors?: Response[];
}
