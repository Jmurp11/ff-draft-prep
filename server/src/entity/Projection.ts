import { 
    Entity,
    Column,
    PrimaryColumn,
    BeforeInsert, 
    BaseEntity
} from "typeorm";
import uuidv4 = require('uuid/v4');

@Entity("projections")
export class Projection extends BaseEntity {
    @PrimaryColumn("uuid")
    id!: string;

    @Column("text")
    playerId!: string;

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

    @BeforeInsert()
    addId() {
        this.id = uuidv4();
    }
}
