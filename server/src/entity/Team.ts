
import {
    Entity,
    Column,
    BaseEntity,
    PrimaryColumn,
    OneToOne,
    ManyToOne
} from 'typeorm';
import { ObjectType, Field, Root } from 'type-graphql';
import { Standings } from './Standings';
import { Stadium } from './Stadium';
import { TeamStats } from './Team-Stats';

@Entity('teams')
@ObjectType()
export class Team extends BaseEntity {
    @Field()
    @PrimaryColumn()
    id!: number;

    @Field()
    @Column('text')
    city!: string;

    @Field()
    @Column('text')
    nickname!: string;

    @Field()
    fullName(@Root() parent: Team): string {
        return `${parent.city} ${parent.nickname}`;
    }

    @Field()
    @Column('text')
    abbreviation!: string;

    @Field()
    @Column('int')
    byeWeek!: number;

    @Field()
    @Column('text')
    logoUrl!: string;

    @Field()
    @Column('text')
    primaryColor!: string;

    @Field()
    @Column('text')
    secondaryColor!: string;

    @Field()
    @Column('text')
    conference!: string;

    @Field()
    @Column('text')
    division!: string;

    @Field()
    @Column('text')
    headCoach!: string;

    @Field()
    @Column('text')
    offensiveCoordinator!: string;

    @Field()
    @Column('text')
    defensiveCoordinator!: string;

    @Field()
    @Column('text')
    offensiveScheme!: string;

    @Field()
    @Column('text')
    defensiveScheme!: string;

    @ManyToOne(() => Stadium, stadium => stadium.team, {
        eager: true
    })
    @Field(() => Stadium)
    @Column('int')
    stadium: number;

    @OneToOne(() => Standings, standings => standings.team, {
        eager: true
    })
    @Field(() => Standings)
    standings: Standings;

    @OneToOne(() => TeamStats, stats => stats.team, {
        eager: true,
        onDelete: 'CASCADE'
    })
    @Field(() => TeamStats, { nullable: true })
    stats: TeamStats;
}