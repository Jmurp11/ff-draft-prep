import { InputType, Field } from 'type-graphql';

@InputType()
export class NotesByPlayerUserInput {

    @Field()
    player: string;

    @Field()
    user: string;
}
