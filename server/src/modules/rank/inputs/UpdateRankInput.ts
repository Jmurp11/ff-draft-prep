import { InputType, Field } from 'type-graphql';

@InputType()
export class UpdateRankInput {
    @Field()
    id: string;

    @Field()
    rank: number;
    
    @Field()
    adp: number;

    @Field()
    tier: string;
}