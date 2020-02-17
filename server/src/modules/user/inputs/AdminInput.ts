import { InputType, Field } from "type-graphql";
import { UserExists } from "../validators/userExists";

@InputType()
export class AdminInput {
  @UserExists()
  @Field()
  id: string;

  @Field()
  isAdmin: boolean;
}
