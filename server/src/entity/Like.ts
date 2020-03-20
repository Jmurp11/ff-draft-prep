import {
    Entity,
    Column,
    BaseEntity,
    JoinColumn,
    PrimaryGeneratedColumn,
    ManyToOne
} from "typeorm";
import { Note, User } from './index';
import { ObjectType, Field } from "type-graphql";

@Entity("likes")
@ObjectType()
export class Like extends BaseEntity {
    @Field()
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @ManyToOne(() => User, {
        eager: true
    })
    @JoinColumn({ name: 'user' })
    @Field(() => User)
    @Column("uuid")
    user!: string;

    @ManyToOne(() => Note, {
        eager: true
    })
    @JoinColumn({ name: 'note' })
    @Field(() => Note)
    @Column("uuid")
    note!: string;
}
