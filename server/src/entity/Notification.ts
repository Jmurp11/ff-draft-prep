import { ObjectType, Field } from 'type-graphql';
import { Note } from './Note';
import { User } from './User';

@ObjectType()
export class Notification {
    @Field(() => User)
    user: User;

    @Field(() => Note)
    note: Note;

    @Field()
    type: string;
}