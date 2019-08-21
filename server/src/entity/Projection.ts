import { 
    Entity,
    Column,
    BaseEntity,
    OneToOne,
    JoinColumn,
    PrimaryGeneratedColumn
} from "typeorm";
import { Player } from "./Player";

@Entity("projections")
export class Projection extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;
    
    @OneToOne(() => Player)
    @JoinColumn()
    @Column("text")
    player!: number;

    @Column("text")
    platform!: string;

    @Column("int")
    completions!: number;

    @Column("int")
    attempts!: number;

    @Column("int")
    passYards!: number;

    @Column("int")
    passTd!: number;

    @Column("int")
    interception!: number;

    @Column("int")
    carries!: number;

    @Column("int")
    rushYards!: number;

    @Column("int")
    rushTd!: number;

    @Column("int")
    fumbles!: number;

    @Column("int")
    targets!: number;

    @Column("int")
    receptions!: number;

    @Column("int")
    receivingYards!: number;

    @Column("int")
    receivingTd!: number;
}
