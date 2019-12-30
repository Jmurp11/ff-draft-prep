import { 
    Entity,
    Column,
    PrimaryGeneratedColumn,
    BaseEntity,
    ManyToOne,
   JoinColumn
} from "typeorm";
import { Team } from "./Team";

@Entity("players")
export class Player extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column("text")
    firstName!: string;

    @Column("text")
    lastName!: string;

    @ManyToOne(() => Team)
    @JoinColumn()
    @Column("text")
    team!: number;

    @Column("text")
    position!: string;

    @Column("int")
    rank!: number;

    @Column("float")
    adp!: number;

    @Column("text")
    tier!: string;
}
