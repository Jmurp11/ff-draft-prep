import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  OneToMany
} from 'typeorm';
import { ObjectType, Field, Root } from 'type-graphql';
import { Team, Rank, Projection, DefaultRank } from './';
import { Note } from './Note';

@Entity('players')
@ObjectType()
export class Player extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Field()
  @Column('text')
  firstName!: string;

  @Field()
  @Column('text')
  lastName!: string;

  @Field()
  name(@Root() parent: Player): string {
    return `${parent.firstName} ${parent.lastName}`;
  }

  @Field()
  initialName(@Root() parent: Player): string {
    return `${parent.firstName.substring(0, 1)}. ${parent.lastName}`;
  }

  @ManyToOne(() => Team, {
    eager: true
  })
  @JoinColumn({ name: 'team' })
  @Field(() => Team, { nullable: true })
  @Column('int')
  team!: number;

  @Field()
  @Column('text')
  position!: string;

  @Field()
  @Column('int')
  depthChartPos!: number;

  @OneToOne(() => Projection, projection => projection.player)
  @Field(() => Projection, { nullable: true })
  projection: Projection;

  @OneToMany(() => Rank, rank => rank.player)
  @Field(() => [Rank], { nullable: true })
  rank: Rank[];

  @OneToOne(() => DefaultRank, defaultRank => defaultRank.player)
  @Field(() => DefaultRank, { nullable: true })
  defaultRank: DefaultRank;

  @OneToMany(() => Note, note => note.player)
  @Field(() => [Note], { nullable: true })
  notes: Note[];
}