import { InputType, Field } from 'type-graphql';

@InputType()
export class TeamStatsInput {
    @Field()
    team!: number;

    @Field()
    bye!: number;

    @Field()
    rank!: number;

    @Field()
    passRank!: number;

    @Field()
    rushRank!: number;

    @Field()
    pointsFor!: number;

    @Field()
    yards!: number;

    @Field()
    plays!: number;

    @Field()
    yardsPerPlay!: number;

    @Field()
    turnovers!: number;

    @Field()
    passAttempts!: number;

    @Field()
    passCompletions!: number;

    @Field()
    passYards!: number;

    @Field()
    passTd!: number;

    @Field()
    interception!: number;

    @Field()
    netYardsPerPass!: number;

    @Field()
    rushAttempt!: number;

    @Field()
    rushYards!: number;

    @Field()
    rushTd!: number;

    @Field()
    yardsPerRush!: number;

    @Field()
    scorePercentage!: number;

    @Field()
    turnoverPercentage!: number;

    @Field()
    offensiveLineRank!: number;

    @Field()
    runningBackSoS!: number;
}