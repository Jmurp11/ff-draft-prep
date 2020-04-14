  
import { 
    Entity,
    Column,
    BaseEntity,
    PrimaryColumn,
    OneToOne
} from 'typeorm';
import { ObjectType, Field, Root } from 'type-graphql';
import { TeamStats } from '.';

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
    @Column('text')
    imageUrl!: string;
    
    @OneToOne(() => TeamStats, stats => stats.team, {
        eager: true,
        onDelete: 'CASCADE'
    })
    @Field(() => TeamStats)
    stats: TeamStats;
}