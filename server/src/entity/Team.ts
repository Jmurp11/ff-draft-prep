import { 
    Entity,
    Column,
    PrimaryColumn,
    BeforeInsert, 
    BaseEntity
} from "typeorm";
import uuidv4 = require('uuid/v4');

@Entity("teams")
export class Team extends BaseEntity {
    @PrimaryColumn("uuid")
    id!: string;

    @Column("text")
    city!: string;

    @Column("text")
    nickname!: string;

    @Column("text")
    abbreviation!: string;

    @BeforeInsert()
    addId() {
        this.id = uuidv4();
    }
}
