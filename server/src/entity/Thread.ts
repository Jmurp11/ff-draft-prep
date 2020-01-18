import {
    Entity,
    Column,
    BaseEntity,
    JoinColumn,
    PrimaryGeneratedColumn,
    ManyToOne,
} from "typeorm";
import { User } from './index';

@Entity("threads")
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
}
