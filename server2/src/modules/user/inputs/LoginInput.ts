import { InputType, Field } from "type-graphql";
import { IsForgotPasswordLock } from "../validators/isForgotPasswordLock";
import { IsConfirmed } from "../validators/isConfirmed";

@InputType()
export class LoginInput {
  @Field()
  @IsConfirmed()
  @IsForgotPasswordLock()
  email: string;

  @Field()
  password: string;
}
