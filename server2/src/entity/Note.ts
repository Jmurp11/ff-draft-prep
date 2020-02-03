import {
    Entity,
    Column,
    BaseEntity,
    JoinColumn,
    PrimaryGeneratedColumn,
    ManyToOne
} from "typeorm";
import { Player, User } from './index';
import { ObjectType } from "type-graphql";

@Entity("notes")
@ObjectType()
export class Note extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @ManyToOne(() => User)
    @JoinColumn()
    @Column("uuid")
    user!: string;

    @ManyToOne(() => Player)
    @JoinColumn()
    @Column("text")
    player!: number;

    @Column("text")
    date!: string;

    @Column("text")
    title!: string;

    @Column("text")
    body!: string;

    @Column("text")
    source!: string;

    @Column("boolean", { default: false }) 
    isPrivate!: boolean;

    @Column("int") 
    likes!: number;

    @Column("int") 
    shares!: number;
}
