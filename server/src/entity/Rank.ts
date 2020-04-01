import {
    Entity,
    Column,
    BaseEntity,
    JoinColumn,
    PrimaryGeneratedColumn,
    ManyToOne
} from 'typeorm';
import { Player, User } from './index';
import { ObjectType, Field } from 'type-graphql';

@Entity('ranks')
@ObjectType()
export class Rank extends BaseEntity {
    @Field()
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @ManyToOne(() => User, user => user.ranks)
    @JoinColumn({ name: 'user' })
    @Field(() => User)
    @Column('uuid')
    user!: string;

    @ManyToOne(() => Player, player => player.rank)
    @JoinColumn({ name: 'player' })
    @Field(() => Player)
    @Column('uuid')
    player!: string;

    @Field()
    @Column('int')
    rank: number;

    @Field()
    @Column('int')
    adp: number;

    @Field()
    @Column('text')
    tier: string;
}
