import { InputType, Field } from 'type-graphql';

@InputType()
export class SubscriptionInput {
    @Field()
    user: string;

    @Field()
    player: number;
}
