import { InputType, Field } from 'type-graphql';

@InputType()
export class NoteInput {
    @Field()
    user: string;

    @Field()
    player: number;

    @Field()
    date: string;

    @Field()
    title: string;

    @Field()
    body: string;

    @Field()
    source: string;

    @Field()
    isPrivate: boolean;
}
