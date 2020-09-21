import { InputType, Field } from 'type-graphql';

@InputType()
export class DraftArgs {
    @Field({ nullable: true })
    filterType: string;
    
    @Field({ nullable: true })
    id: string;

    @Field({ nullable: true })
    type: string;

    @Field({ nullable: true })
    numOfTeams: number;

    @Field({ nullable: true })
    timePerPick: number;

    @Field({ nullable: true })
    isActive: boolean;

    @Field({ nullable: true })
    creationTime: string;

    @Field({ nullable: true })
    take: number;

    @Field({ nullable: true })
    skip: number;
}