import { InputType, Field } from 'type-graphql';

@InputType()
export class PlayerArgs {
    @Field()
    id: string;

    @Field()
    firstName: string;

    @Field()
    lastName: string;

    @Field()
    team: number;

    @Field()
    position: string;
}