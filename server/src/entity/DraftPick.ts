import {
    Entity,
    Column,
    BaseEntity,
    JoinColumn,
    PrimaryGeneratedColumn,
    ManyToOne
} from "typeorm";
import { Draft, Player } from './index';

@Entity("draftpicks")
export class DraftPick extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @ManyToOne(() => Draft)
    @JoinColumn()
    @Column("uuid")
    draft!: string;

    @ManyToOne(() => Player)
    @JoinColumn()
    @Column("text")
    player!: number;

    @Column("int")
    picked!: number;
}
