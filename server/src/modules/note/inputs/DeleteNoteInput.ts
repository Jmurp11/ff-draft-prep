import { InputType, Field } from 'type-graphql';

@InputType()
export class DeleteNoteInput {
    @Field()
    id: string;
    
    @Field()
    user: string;
}
