import { InputType, Field } from 'type-graphql';

@InputType()
export class LikeInput {
    @Field()
    user: string;

    @Field()
    note: string;
}
