import { InputType, Field } from "type-graphql";

@InputType()
export class LogoutInput {
  @Field()
  userId: string;
}
