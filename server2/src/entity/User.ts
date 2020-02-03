import * as bcrypt from 'bcryptjs';
import { 
    Entity,
    Column,
    PrimaryGeneratedColumn,
    BaseEntity,
    BeforeInsert
} from "typeorm";
import { ObjectType } from 'type-graphql';

@Entity("users")
@ObjectType()
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

    @Column("boolean", { default: false }) 
    isLoggedIn!: boolean;

    @BeforeInsert()
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 10);
    }
}
