import { InputType, Field } from 'type-graphql';

@InputType()
export class DraftPickArgs {
    @Field({ nullable: true })
    filterType: string;
    
    @Field({ nullable: true })
    id: string;

    @Field({ nullable: true })
    draft: string;

    @Field({ nullable: true })
    user: string;

    @Field({ nullable: true })
    player: number;

    @Field({ nullable: true })
    pickNumber: number;

    @Field({ nullable: true })
    take: number;

    @Field({ nullable: true })
    skip: number;
}