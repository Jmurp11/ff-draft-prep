import { InputType, Field } from "type-graphql";
import { MinLength } from "class-validator";
import { passwordNotLongEnough } from "../messages/messages";

@InputType()
export class ChangePasswordInput {
  @Field()
  token: string;

  @MinLength(8, {
    message: passwordNotLongEnough
  })
  @Field()
  password: string;
}
