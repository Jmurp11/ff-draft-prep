import {
    Entity,
    Column,
    BaseEntity,
    OneToMany,
    PrimaryColumn
} from 'typeorm';
import { Team } from './Team';
import { ObjectType, Field } from 'type-graphql';

@Entity('stadium')
@ObjectType()
export class Stadium extends BaseEntity {
    @Field()
    @PrimaryColumn("int")
    id!: string;

    @OneToMany(() => Team, team => team.stadium)
    @Field(() => [Team])
    team: Team[];

    @Field({ nullable: true })
    @Column('text')
    name!: string;

    @Field({ nullable: true })
    @Column('text')
    city!: string;

    @Field({ nullable: true })
    @Column('text', { nullable: true })
    state: string;

    @Field({ nullable: true })
    @Column('text')
    country!: string;

    @Field({ nullable: true })
    @Column('int')
    capacity!: number;

    @Field({ nullable: true })
    @Column('text')
    type!: string;

    @Field({ nullable: true })
    @Column('text', { nullable: true })
    playingSurface: string;
}
