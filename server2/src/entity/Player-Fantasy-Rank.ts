import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    BaseEntity,
    ManyToOne,
   JoinColumn
} from "typeorm";
import { ObjectType, Field } from "type-graphql";
import { Player } from './';

@Entity("player-fantasy-ranks")
@ObjectType()
export class PlayerFantasyRank extends BaseEntity {
    @Field()
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => Player)
    @JoinColumn()
    @Field(() => Player)
    @Column("int")
    player!: number;

    @Field()
    @Column("int")
    rank!: number;

    @Field()
    @Column("float")
    adp!: number;

    @Field()
    @Column("text")
    tier!: string;
}