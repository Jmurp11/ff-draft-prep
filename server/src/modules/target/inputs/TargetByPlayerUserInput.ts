import { InputType, Field } from 'type-graphql';

@InputType()
export class TargetByPlayerUserInput {
    @Field()
    user: string;

    @Field()
    player: string;
}