import {
    Entity,
    Column,
    BaseEntity,
    JoinColumn,
    PrimaryGeneratedColumn,
    ManyToOne
} from "typeorm";
import { Thread, User } from './index';

@Entity("message")
export class Message extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @ManyToOne(() => User)
    @JoinColumn()
    @Column("uuid")
    author!: string;

    @ManyToOne(() => Thread)
    @JoinColumn()
    @Column("uuid")
    thread!: string;

    @Column("text")
    dateCreated!: string;
    
    @Column("text")
    body!: string;
}
