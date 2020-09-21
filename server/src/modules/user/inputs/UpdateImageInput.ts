import { InputType, Field } from "type-graphql";

@InputType()
export class UpdateImageInput {
  @Field()
  id: string;

  @Field()
  image: string;
}
