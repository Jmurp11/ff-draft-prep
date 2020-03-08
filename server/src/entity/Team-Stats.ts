import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    BaseEntity,
    ManyToOne,
    JoinColumn
} from "typeorm";
import { ObjectType, Field } from "type-graphql";
import { Team } from "../entity";

@Entity("teamstats")
@ObjectType()
export class TeamStats extends BaseEntity {
    @Field()
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => Team, {
        eager: true
    })
    @JoinColumn({ name: 'team'})
    @Field(() => Team)
    @Column("int")
    team!: number;

    @Field()
    @Column("int")
    bye!: number;


    @Field()
    @Column("int")
    rank!: number;

    @Field()
    @Column("int")
    passRank!: number;

    @Field()
    @Column("int")
    rushRank!: number;

    @Field()
    @Column("float")
    pointsFor!: number;

    @Field()
    @Column("float")
    yards!: number;

    @Field()
    @Column("float")
    plays!: number;

    @Field()
    @Column("float")
    yardsPerPlay!: number;

    @Field()
    @Column("float")
    turnovers!: number;

    @Field()
    @Column("float")
    passAttempts!: number;

    @Field()
    @Column("float")
    passCompletions!: number;

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
    netYardsPerPass!: number;

    @Field()
    @Column("float")
    rushAttempt!: number;

    @Field()
    @Column("float")
    rushYards!: number;

    @Field()
    @Column("float")
    rushTd!: number;

    @Field()
    @Column("float")
    yardsPerRush!: number;

    @Field()
    @Column("float")
    scorePercentage!: number;

    @Field()
    @Column("float")
    turnoverPercentage!: number;

    @Field()
    @Column("float")
    offensiveLineRank!: number;

    @Field()
    @Column("float")
    runningBackSoS!: number;
}
