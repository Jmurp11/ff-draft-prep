import { InputType, Field } from 'type-graphql';

@InputType()
export class PlayerArgs {
    @Field({ nullable: true })
    filterType: string;
    
    @Field({ nullable: true })
    id: number;

    @Field({ nullable: true })
    firstName: string;

    @Field({ nullable: true })
    lastName: string;

    @Field({ nullable: true })
    team: number;

    @Field({ nullable: true })
    position: string;

    @Field({ nullable: true })
    status: string;

    @Field({ nullable: true })
    take: number;

    @Field({ nullable: true })
    skip: number;
}