import { 
    Entity,
    Column,
    BaseEntity,
    JoinColumn,
    PrimaryGeneratedColumn,
    ManyToOne
} from "typeorm";
import { Player } from "./Player";

@Entity("projections")
export class Projection extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;
    
    @ManyToOne(() => Player)
    @JoinColumn()
    @Column("text")
    player!: number;

    @Column("float")
    completions!: number;

    @Column("float")
    attempts!: number;

    @Column("float")
    passYards!: number;

    @Column("float")
    passTd!: number;

    @Column("float")
    interception!: number;

    @Column("float")
    carries!: number;

    @Column("float")
    rushYards!: number;

    @Column("float")
    rushTd!: number;

    @Column("float")
    fumbles!: number;

    @Column("float")
    receptions!: number;

    @Column("float")
    receivingYards!: number;

    @Column("float")
    receivingTd!: number;

    @Column("float")
    fantasyPoints!: number;
}
