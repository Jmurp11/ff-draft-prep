import { ObjectType, Field } from "type-graphql";
import { Response } from "../../types";
import { User } from "../../entity";

@ObjectType()
export class UserResponse {
  @Field(() => User, { nullable: true })
  user?: User;

  @Field(() => [Response], { nullable: true })
  errors?: Response[];
}
