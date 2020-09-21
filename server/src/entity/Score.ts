import {
    Entity,
    Column,
    BaseEntity,
    JoinColumn,
    PrimaryGeneratedColumn,
    ManyToOne
} from 'typeorm';
import { Note, User } from './index';
import { ObjectType, Field } from 'type-graphql';

@Entity('score')
@ObjectType()
export class Score extends BaseEntity {
    @Field()
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @ManyToOne(() => User, user => user.score, {
        onDelete: 'CASCADE'
    })
    @JoinColumn({ name: 'user' })
    @Field(() => User)
    @Column('uuid')
    user!: string;

    @ManyToOne(() => Note, note => note.score, {
        onDelete: 'CASCADE'
    })
    @JoinColumn({ name: 'note' })
    @Field(() => Note)
    @Column('uuid')
    note!: string;

    @Field()
    @Column('boolean')
    response: boolean;

    @Field(() => Date)
    @Column('timestamp')
    creationTime!: string;
}