import * as bcrypt from 'bcryptjs';
import { 
    Entity,
    Column,
    PrimaryGeneratedColumn,
    BaseEntity,
    BeforeInsert
} from "typeorm";

@Entity("users")
export class User extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column("varchar", { length: 255 })
    email!: string;

    @Column("text")
    password!: string;

    @Column("text")
    username!: string;

    @Column("boolean", { default: false })
    confirmed!: boolean;

    @Column("boolean", { default: false }) 
    forgotPasswordLock!: boolean;
    
    @BeforeInsert()
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 10);
    }
}
