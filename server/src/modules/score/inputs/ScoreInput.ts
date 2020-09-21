import { InputType, Field } from 'type-graphql';

@InputType()
export class ScoreInput {
    @Field()
    user: string;

    @Field()
    note: string;

    @Field()
    response: boolean;
}
