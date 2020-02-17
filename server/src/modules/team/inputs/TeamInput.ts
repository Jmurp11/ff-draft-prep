import { InputType, Field } from 'type-graphql';
import { TeamExists } from '../validators/teamExists';

@InputType()
export class TeamInput {
    @Field()
    city: string;

    @Field()
    @TeamExists({ message: 'Team already exists!' })
    nickname: string;

    @Field()
    abbreviation: string;

    @Field()
    imageUrl: string;
}
