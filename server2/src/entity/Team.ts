import { 
    Entity,
    Column,
    PrimaryGeneratedColumn,
    BaseEntity
} from "typeorm";
import { ObjectType, Field } from "type-graphql";

@Entity("teams")
@ObjectType()
export class Team extends BaseEntity {
    @Field()
    @PrimaryGeneratedColumn()
    id!: number;

    @Field()
    @Column("text")
    city!: string;

    @Field()
    @Column("text")
    nickname!: string;

    @Field()
    @Column("text")
    abbreviation!: string;

    @Field()
    @Column("text")
    imageUrl!: string;
}
