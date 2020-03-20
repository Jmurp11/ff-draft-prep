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

@Entity("shares")
@ObjectType()
export class Share extends BaseEntity {
    @Field()
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @ManyToOne(() => User)
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