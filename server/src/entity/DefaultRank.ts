import {
    Entity,
    Column,
    BaseEntity,
    JoinColumn,
    PrimaryGeneratedColumn,
    OneToOne
} from 'typeorm';
import { Player } from './index';
import { ObjectType, Field } from 'type-graphql';

@Entity('def-ranks')
@ObjectType()
export class DefaultRank extends BaseEntity {
    @Field()
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @OneToOne(() => Player, player => player.rank)
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
