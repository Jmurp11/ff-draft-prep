import { InputType, Field } from 'type-graphql';

@InputType()
export class TeamArgs {
    @Field({ nullable: true })
    filterType: string;
    
    @Field({ nullable: true })
    id: number;

    @Field({ nullable: true })
    abbreviation: string;

    @Field({ nullable: true })
    city: string;

    @Field({ nullable: true })
    nickname: string;

    @Field({ nullable: true })
    conference: string;

    @Field({ nullable: true })
    division: string;

    @Field({ nullable: true })
    skip: number;

    @Field({ nullable: true })
    take: number;
}