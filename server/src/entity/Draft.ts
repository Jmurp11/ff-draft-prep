import {
    Entity,
    Column,
    BaseEntity,
    JoinColumn,
    PrimaryGeneratedColumn,
    ManyToOne,
    OneToMany
} from "typeorm";
import { DraftPick, User } from './index';

@Entity("drafts")
export class Draft extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @ManyToOne(() => User)
    @JoinColumn()
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

    @OneToMany(() => DraftPick, picks => picks.draft)
    @Column("text")
    picks: DraftPick[] | undefined;
}
