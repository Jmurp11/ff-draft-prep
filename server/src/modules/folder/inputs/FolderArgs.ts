import { InputType, Field } from 'type-graphql';

@InputType()
export class FolderArgs {
    @Field({ nullable: true })
    filterType: string;

    @Field({ nullable: true })
    id: string;

    @Field({ nullable: true })
    name: string;

    @Field({ nullable: true })
    user: string;

    @Field({ nullable: true })
    take: number;

    @Field({ nullable: true })
    skip: number;
}