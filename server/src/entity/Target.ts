import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    BaseEntity,
    JoinColumn,
    ManyToOne
} from "typeorm";
import { ObjectType, Field } from "type-graphql";
import { Player, User } from "./";

@Entity("targets")
@ObjectType()
export class Target extends BaseEntity {
    @Field()
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @ManyToOne(() => User, {
        eager: true
    })
    @JoinColumn({ name: 'user' })
    @Field(() => User)
    @Column("text")
    user!: string;

    @ManyToOne(() => Player, {
        eager: true
    })
    @JoinColumn({ name: 'player' })
    @Field(() => Player)
    @Column()
    player!: number;

    @Field()
    @Column()
    round: number;
}
