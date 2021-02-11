import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    BaseEntity,
    JoinColumn,
    ManyToOne
} from 'typeorm';
import { ObjectType, Field } from 'type-graphql';
import { User } from './User';
import { Player } from './Player';

@Entity('targets')
@ObjectType()
export class Target extends BaseEntity {
    @Field()
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'user' })
    @Field(() => User)
    @Column('uuid')
    user!: string;

    @ManyToOne(() => Player, {
        eager: true
    })
    @JoinColumn({ name: 'player' })
    @Field(() => Player)
    @Column('int')
    player!: number;

    @Field()
    @Column()
    round: number;
}
