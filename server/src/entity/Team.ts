  
import { 
    Entity,
    Column,
    BaseEntity,
    PrimaryColumn,
    OneToOne
} from 'typeorm';
import { ObjectType, Field } from 'type-graphql';
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
    @Column('text')
    abbreviation!: string;

    @Field()
    @Column('text')
    imageUrl!: string;
    
    @OneToOne(() => TeamStats, stats => stats.team, {
        eager: true,
        onDelete: 'CASCADE'
    })
    @Field(() => TeamStats)
    stats: TeamStats;
}