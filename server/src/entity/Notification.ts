import { ObjectType, Field } from 'type-graphql';
import { Note, User } from './';

@ObjectType()
export class Notification {
    @Field(() => User)
    user: User;

    @Field(() => Note)
    note: Note;

    @Field()
    type: string;
}