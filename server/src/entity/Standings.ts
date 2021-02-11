import {
    Entity,
    Column,
    BaseEntity,
    JoinColumn,
    OneToOne,
    PrimaryColumn
} from 'typeorm';
import { Team } from './Team';
import { ObjectType, Field, Root } from 'type-graphql';

@Entity('standings')
@ObjectType()
export class Standings extends BaseEntity {
    @OneToOne(() => Team, team => team.standings)
    @JoinColumn({ name: 'team' })
    @Field(() => Team)
    @PrimaryColumn('int')
    team!: number;

    @Field()
    @Column('int')
    wins!: number;

    @Field()
    @Column('int')
    losses!: number;

    @Field()
    @Column('int')
    ties!: number;

    @Field()
    @Column('int')
    divisionWins!: number;

    @Field()
    @Column('int')
    divisionLosses!: number;

    @Field()
    @Column('int')
    divisionTies!: number;

    @Field()
    @Column('int')
    conferenceWins!: number;

    @Field()
    @Column('int')
    conferenceLosses!: number;

    @Field()
    @Column('int')
    conferenceTies!: number;

    @Field()
    @Column('int')
    pointsFor!: number;

    @Field()
    @Column('int')
    pointsAgainst!: number;

    @Field()
    @Column('int')
    touchdowns!: number;

    @Field()
    winPercentage(@Root() parent: Standings): number {
      return (parent.wins + (.5 * parent.ties)) / (parent.wins + parent.losses + parent.ties);
    }

    @Field()
    netPoints(@Root() parent: Standings): number {
      return parent.pointsFor - parent.pointsAgainst;
    }
}
