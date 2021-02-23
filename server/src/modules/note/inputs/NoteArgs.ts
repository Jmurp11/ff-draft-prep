import { InputType, Field } from 'type-graphql';

@InputType()
export class NoteArgs {
    @Field({ nullable: true })
    filterType: string;

    @Field({ nullable: true })
    id: string;
    
    @Field({ nullable: true })
    player: number;

    @Field({ nullable: true })
    user: string;

    @Field({ nullable: true })
    folder: string;

    @Field({ nullable: true })
    take: number;

    @Field({ nullable: true })
    skip: number;
}