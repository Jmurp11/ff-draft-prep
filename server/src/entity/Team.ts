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
    passRank!: number;
    
    @Column("int")
    rushRank!: number;
    

    @Column("float")
    pointsFor!: number;

    @Column("float")
    yards!: number;

    @Column("float")
    plays!: number;

    @Column("float")
    yardsPerPlay!: number;

    @Column("float")
    turnovers!: number;

    @Column("float")
    passAttempts!: number;

    @Column("float")
    passCompletions!: number;

    @Column("float")
    passYards!: number;

    @Column("float")
    passTd!: number;

    @Column("float")
    interception!: number;

    @Column("float")
    netYardsPerPass!: number;

    @Column("float")
    rushAttempt!: number;

    @Column("float")
    rushYards!: number;

    @Column("float")
    rushTd!: number;

    @Column("float")
    yardsPerRush!: number;

    @Column("float")
    scorePercentage!: number;

    @Column("float")
    turnoverPercentage!: number;

    @Column("float")
    offensiveLineRank!: number;

    @Column("float")
    runningBackSoS!: number;
}
