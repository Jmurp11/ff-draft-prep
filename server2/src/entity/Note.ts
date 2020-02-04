import {
    Entity,
    Column,
    BaseEntity,
    JoinColumn,
    PrimaryGeneratedColumn,
    ManyToOne
} from "typeorm";
import { Player, User } from './index';
import { ObjectType, Field } from "type-graphql";

@Entity("notes")
@ObjectType()
export class Note extends BaseEntity {
    @Field()
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @ManyToOne(() => User)
    @JoinColumn()
    @Field()
    @Column("uuid")
    user!: string;

    @ManyToOne(() => Player)
    @JoinColumn()
    @Field()
    @Column("text")
    player!: number;

    @Field()
    @Column("text")
    date!: string;

    @Field()
    @Column("text")
    title!: string;

    @Field()
    @Column("text")
    body!: string;

    @Field()
    @Column("text")
    source!: string;

    @Field()
    @Column("boolean", { default: false }) 
    isPrivate!: boolean;

    @Field()
    @Column("int") 
    likes!: number;

    @Field()
    @Column("int") 
    shares!: number;
}
