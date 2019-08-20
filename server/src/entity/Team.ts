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
}
