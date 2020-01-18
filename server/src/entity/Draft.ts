import {
    Entity,
    Column,
    BaseEntity,
    PrimaryGeneratedColumn,
    ManyToOne
} from "typeorm";
import { User } from './index';

@Entity("drafts")
export class Draft extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @ManyToOne(() => User)
    @Column("uuid")
    user!: string;

    @Column("text")
    date!: string;

    @Column("text")
    type!: string;

    @Column("int")
    numberOfTeams!: number;

    @Column("text")
    title!: string;
}
