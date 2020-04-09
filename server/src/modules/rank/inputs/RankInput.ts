import { InputType, Field } from 'type-graphql';

@InputType()
export class RankInput {
    @Field()
    user: string;

    @Field()
    firstName: string;

    @Field()
    lastName: string;

    @Field()
    position: string;

    @Field()
    team: string;

    @Field()
    rank: number;

    @Field()
    adp: number;

    @Field()
    tier: string;
}

@InputType()
export class DefaultRankInput {
    @Field()
    firstName: string;

    @Field()
    lastName: string;

    @Field()
    position: string;

    @Field()
    team: string;

    @Field()
    rank: number;

    @Field()
    adp: number;

    @Field()
    tier: string;
}