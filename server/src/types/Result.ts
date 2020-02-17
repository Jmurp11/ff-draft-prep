import { ObjectType, Field } from "type-graphql";
import { Response } from "./Response";

@ObjectType()
export class Result {
  @Field(() => [Response], { nullable: true })
  success?: Response[];

  @Field(() => [Response], { nullable: true })
  errors?: Response[];
}
