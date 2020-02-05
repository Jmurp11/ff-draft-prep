import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    BaseEntity,
    ManyToOne,
   JoinColumn
} from "typeorm";
import { Team } from "./index";
import { ObjectType, Field } from "type-graphql";

@Entity("players")
@ObjectType()
export class Player extends BaseEntity {
    @Field()
    @PrimaryGeneratedColumn()
    id!: number;

    @Field()
    @Column("text")
    firstName!: string;

    @Field()
    @Column("text")
    lastName!: string;

    @ManyToOne(() => Team)
    @JoinColumn()
    @Field(() => Team)
    @Column("int")
    team!: number;

    @Field()
    @Column("text")
    position!: string;

    @Field()
    @Column("int")
    rank!: number;

    @Field()
    @Column("float")
    adp!: number;

    @Field()
    @Column("text")
    tier!: string;
}
