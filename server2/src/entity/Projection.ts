import {
    Entity,
    Column,
    BaseEntity,
    JoinColumn,
    PrimaryGeneratedColumn,
    ManyToOne
} from "typeorm";
import { Player } from "./index";
import { ObjectType, Field } from "type-graphql";

@Entity("projections")
@ObjectType()
export class Projection extends BaseEntity {
    @Field()
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => Player)
    @JoinColumn()
    @Field()
    @Column("text")
    player!: number;

    @Field()
    @Column("float")
    completions!: number;

    @Field()
    @Column("float")
    attempts!: number;

    @Field()
    @Column("float")
    passYards!: number;

    @Field()
    @Column("float")
    passTd!: number;

    @Field()
    @Column("float")
    interception!: number;

    @Field()
    @Column("float")
    carries!: number;

    @Field()
    @Column("float")
    rushYards!: number;

    @Field()
    @Column("float")
    rushTd!: number;

    @Field()
    @Column("float")
    fumbles!: number;

    @Field()
    @Column("float")
    receptions!: number;

    @Field()
    @Column("float")
    receivingYards!: number;

    @Field()
    @Column("float")
    receivingTd!: number;

    @Field()
    @Column("float")
    fantasyPoints!: number;
}
