import { 
    Entity,
    Column,
    PrimaryGeneratedColumn,
    BaseEntity
} from "typeorm";

@Entity("teams")
export class Team extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column("text")
    city!: string;

    @Column("text")
    nickname!: string;

    @Column("text")
    abbreviation!: string;

    @Column("int")
    bye!: number;
    
    @Column("text")
    imageUrl!: string;
    
    @Column("int")
    rank!: number;
    
    @Column("int")
    pointsFor!: number;

    @Column("int")
    yards!: number;

    @Column("int")
    plays!: number;

    @Column("float")
    yardsPerPlay!: number;

    @Column("int")
    turnovers!: number;

    @Column("int")
    passAttempts!: number;

    @Column("int")
    passCompletions!: number;

    @Column("int")
    passYards!: number;

    @Column("int")
    passTd!: number;

    @Column("int")
    interception!: number;

    @Column("float")
    netYardsPerPass!: number;

    @Column("int")
    rushAttempt!: number;

    @Column("int")
    rushYards!: number;

    @Column("int")
    rushTd!: number;

    @Column("float")
    yardsPerRush!: number;

    @Column("float")
    scorePercentage!: number;

    @Column("float")
    turnoverPercentage!: number;

    @Column("int")
    offensiveLineRank!: number;

    @Column("int")
    runningBackSoS!: number;
}
