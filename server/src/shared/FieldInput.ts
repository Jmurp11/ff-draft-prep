import { InputType, Field } from 'type-graphql';

@InputType()
export class FieldInput {
    @Field()
    fieldTable: string;

    @Field()
    fieldName: string;

    @Field({ nullable: true })
    fieldOptionString: string;

    @Field({ nullable: true })
    fieldOptionNumber: number;

    @Field({ nullable: true })
    fieldOptionBoolean: boolean;

    @Field({ nullable: true })
    fieldOperator: string;
}