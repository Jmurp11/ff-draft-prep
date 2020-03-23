import { InputType, Field } from 'type-graphql';

@InputType()
export class ShareInput {
    @Field()
    user: string;

    @Field()
    note: string;
}
