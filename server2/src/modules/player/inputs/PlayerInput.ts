import { InputType, Field } from 'type-graphql';

@InputType()
export class PlayerInput {
    @Field()
    firstName: string;

    @Field()
    lastName: string;

    @Field()
    team: string;

    @Field()
    position: string;
}