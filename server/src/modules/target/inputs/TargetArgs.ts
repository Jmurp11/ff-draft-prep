import { InputType, Field } from 'type-graphql';

@InputType()
export class TargetArgs {
    @Field({ nullable: true })
    filterType: string;

    @Field({ nullable: true })
    player: number;

    @Field({ nullable: true })
    user: string;

    @Field({ nullable: true })
    skip: number;

    @Field({ nullable: true })
    take: number;
}

@InputType()
export class DeleteTargetArgs {
    @Field({ nullable: true })
    id: string;
}