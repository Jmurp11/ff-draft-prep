import {
    Entity,
    Column,
    BaseEntity,
    JoinColumn,
    PrimaryGeneratedColumn,
    ManyToOne,
    OneToMany
} from 'typeorm';
import { Score, Player, User } from './index';
import { ObjectType, Field } from 'type-graphql';

@Entity('notes')
@ObjectType()
export class Note extends BaseEntity {
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
    @Column('text')
    title!: string;

    @Field()
    @Column('text')
    body!: string;

    @Field()
    @Column('boolean', { default: false })
    isPrivate!: boolean;

    @Field(() => [Score], { nullable: true })
    @OneToMany(() => Score, score => score.note, {
        eager: true,
        onDelete: 'CASCADE'
    })
    score: Score[];

    @Field(() => Date)
    @Column('timestamp')
    creationTime!: string;
}
