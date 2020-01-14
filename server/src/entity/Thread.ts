import {
    Entity,
    Column,
    BaseEntity,
    JoinColumn,
    PrimaryGeneratedColumn,
    ManyToOne,
    OneToMany
} from "typeorm";
import { Message, User } from './index';

@Entity("notes")
export class Thread extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @ManyToOne(() => User)
    @JoinColumn()
    @Column("uuid")
    creator!: string;

    @Column("text")
    title!: string;

    @Column("text")
    dateCreated!: string;

    @OneToMany(() => Message, message => message.thread)
    messages: Message[] | undefined;
}
