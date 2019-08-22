import { 
    Entity,
    Column,
    PrimaryGeneratedColumn,
   // BeforeInsert, 
    BaseEntity,
    OneToOne,
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

    @OneToOne(() => Team)
    @JoinColumn()
    @Column("text")
    team!: number;

    @Column("text")
    position!: string;

    @Column("int")
    rank!: number;

    @Column("int")
    tier!: number;
}
