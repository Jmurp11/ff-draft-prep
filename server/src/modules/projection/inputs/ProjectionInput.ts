import { InputType, Field } from 'type-graphql';

@InputType()
export class ProjectionInput {
    @Field()
    firstName: string;

    @Field()
    lastName: string;

    @Field()
    team: string;

    @Field()
    completions: number;
    
    @Field()
    attempts: number;
    
    @Field()
    passTd: number;
    
    @Field()
    passYards: number;
    
    @Field()
    interception: number;
    
    @Field()
    carries: number;
    
    @Field()
    rushYards: number;
    
    @Field()
    rushTd: number;
    
    @Field()
    fumbles: number;
           
    @Field()
    receptions: number;

    @Field()
    receivingYards: number;

    @Field()
    receivingTd: number;

    @Field()
    fantasyPoints: number;
}