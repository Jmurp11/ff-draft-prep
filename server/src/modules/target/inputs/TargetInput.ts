import { InputType, Field } from 'type-graphql';

@InputType()
export class TargetInput {

    @Field()
    player: number;

    @Field()
    round: number;
}