import {
    Entity,
    Column,
    BaseEntity,
    JoinColumn,
    PrimaryGeneratedColumn,
    ManyToOne
} from "typeorm";
import { Player } from './index';
import { ObjectType, Field } from "type-graphql";

@Entity("notes")
@ObjectType()
export class Note extends BaseEntity {
    @Field()
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Field(() => String)
    @Column("text")
    user!: string;

    @ManyToOne(() => Player)
    @JoinColumn({ name: 'player' })
    @Field(() => Player)
    @Column("text")
    player!: number;

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

    @Field(() => Date)
    @Column("timestamp")
    creationTime!: string;
}
