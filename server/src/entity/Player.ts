import { 
    Entity,
    Column,
    PrimaryColumn,
    BeforeInsert, 
    BaseEntity
} from "typeorm";
import uuidv4 = require('uuid/v4');

@Entity("players")
export class Player extends BaseEntity {
    @PrimaryColumn("uuid")
    id!: string;

    @Column("text")
    firstName!: string;

    @Column("text")
    lastName!: string;

    @Column("text")
    team!: string;

    @Column("text")
    position!: string;

    @BeforeInsert()
    addId() {
        this.id = uuidv4();
    }
}
