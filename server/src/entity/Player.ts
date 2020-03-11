import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    BaseEntity,
    JoinColumn,
    ManyToOne
} from "typeorm";
import { ObjectType, Field, Root } from "type-graphql";
import { TeamStats } from "./";

@Entity("players")
@ObjectType()
export class Player extends BaseEntity {
    @Field()
    @PrimaryGeneratedColumn()
    id!: number;

    @Field()
    @Column("text")
    firstName!: string;

    @Field()
    @Column("text")
    lastName!: string;

    @Field()
    name(@Root() parent: Player): string {
      return `${parent.firstName} ${parent.lastName}`;
    }
    
    @Field()
    initialName(@Root() parent: Player): string {
      return `${parent.firstName.substring(0, 1)}. ${parent.lastName}`;
    }

    @ManyToOne(() => TeamStats, {
        eager: true
    })
    @JoinColumn({ name: 'team' })
    @Field(() => TeamStats, { nullable: true })
    @Column("int")
    team!: number;

    @Field()
    @Column("text")
    position!: string;

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
