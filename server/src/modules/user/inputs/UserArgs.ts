import { InputType, Field } from 'type-graphql';

@InputType()
export class UserArgs {
    @Field({ nullable: true })
    filterType: string;

    @Field({ nullable: true })
    id: string;

    @Field({ nullable: true })
    email: string;

    @Field({ nullable: true })
    username: string;

    @Field({ nullable: true })
    user: string;

    @Field({ nullable: true })
    take: number;

    @Field({ nullable: true })
    skip: number;
}