import { InputType, Field } from 'type-graphql';

@InputType()
export class DepthChartInput {
    @Field()
    team: number;

    @Field()
    position: string;
}