import * as bcrypt from 'bcryptjs';
import { 
    Entity,
    Column,
    PrimaryGeneratedColumn,
    BaseEntity,
    BeforeInsert
} from "typeorm";
import { ObjectType, Field } from 'type-graphql';

@Entity("users")
@ObjectType()
export class User extends BaseEntity {
    @Field()
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Field()
    @Column("varchar", { length: 255 })
    email!: string;

    @Field()
    @Column("text")
    password!: string;

    @Field()
    @Column("text")
    username!: string;

    @Field()
    @Column("boolean", { default: false })
    confirmed!: boolean;

    @Field()
    @Column("boolean", { default: false }) 
    forgotPasswordLock!: boolean;

    @Field()
    @Column("boolean", { default: false }) 
    isLoggedIn!: boolean;

    @Field(() => Date)
    @Column("timestamp")
    creationTime!: string;

    @Field(() => Date)
    @Column("timestamp")
    lastLoggedIn!: string;

    @BeforeInsert()
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 10);
    }
}
