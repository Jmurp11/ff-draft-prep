import {
    Entity,
    Column,
    BaseEntity,
    JoinColumn,
    PrimaryGeneratedColumn,
    ManyToOne
} from 'typeorm';
import { Player } from './Player';
import { ObjectType, Field, Root } from 'type-graphql';

@Entity('projections')
@ObjectType()
export class Projection extends BaseEntity {
    @Field()
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => Player)
    @JoinColumn({ name: 'player' })
    @Field(() => Player)
    @Column('int')
    player!: number;

    @Field()
    @Column('float')
    completions!: number;

    @Field()
    @Column('float')
    attempts!: number;

    @Field({ nullable: true })
    completionPercentage(@Root() parent: Projection): number {
        return (parent.completions / parent.attempts) * 100;
    }

    @Field({ nullable: true })
    yardsPerAttempt(@Root() parent: Projection): number {
        return parent.attempts ? parent.passYards / parent.attempts : 0;
    }

    @Field()
    @Column('float')
    passYards!: number;

    @Field()
    @Column('float')
    passTd!: number;

    @Field()
    @Column('float')
    interception!: number;

    @Field()
    @Column('float')
    carries!: number;

    @Field()
    @Column('float')
    rushYards!: number;

    @Field({ nullable: true })
    yardsPerCarry(@Root() parent: Projection): number {
        return parent.carries ? parent.rushYards / parent.carries : 0;
    }

    @Field()
    @Column('float')
    rushTd!: number;

    @Field()
    @Column('float')
    fumbles!: number;

    @Field()
    @Column('float')
    receptions!: number;

    @Field()
    @Column('float')
    receivingYards!: number;

    @Field({ nullable: true })
    yardsPerReception(@Root() parent: Projection): number {
        return parent.receptions ? parent.receivingYards / parent.receptions : 0;
    }

    @Field()
    @Column('float')
    receivingTd!: number;

    @Field()
    halfPPRTotalPoints(@Root() parent: Projection): number {
        return ((parent.rushTd * 6) + (parent.rushYards * .10) +
        (parent.passTd * 4) + (parent.passYards * .04) +
        (parent.receivingTd * 6) + (parent.receivingYards * .10) + (parent.receptions * .5))
        - ((parent.fumbles * 2) + (parent.interception * 2));;
    }

    @Field()
    pprTotalPoints(@Root() parent: Projection): number {
        return ((parent.rushTd * 6) + (parent.rushYards * .10) +
        (parent.passTd * 4) + (parent.passYards * .04) +
        (parent.receivingTd * 6) + (parent.receivingYards * .10) + parent.receptions)
        - ((parent.fumbles * 2) + (parent.interception * 2));
    }

    @Field()
    totalPoints(@Root() parent: Projection): number {
        return ((parent.rushTd * 6) + (parent.rushYards * .10) +
            (parent.passTd * 4) + (parent.passYards * .04) +
            (parent.receivingTd * 6) + (parent.receivingYards * .10))
            - ((parent.fumbles * 2) + (parent.interception * 2));
    }

    @Field()
    touches(@Root() parent: Projection): number {
        return parent.carries + parent.attempts + parent.receptions;
    }
}