import { InputType, Field } from 'type-graphql';

@InputType()
export class TargetInput {
    @Field()
    user: string;

    @Field()
    player: number;

    @Field()
    round: number;
}