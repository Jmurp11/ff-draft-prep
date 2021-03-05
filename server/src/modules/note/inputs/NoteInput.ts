import { InputType, Field } from 'type-graphql';

@InputType()
export class NoteInput {

    @Field({ nullable: true })
    id: string;

    @Field()
    title: string;

    @Field({ nullable: true })
    folder: string;

    @Field()
    body: string;

    @Field()
    isPrivate: boolean;
}

@InputType()
export class PlayerReferenceInput {
    @Field({ nullable: true })
    player: number;
}