import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class Response {
  @Field()
  path: string;

  @Field()
  message: string;
}
