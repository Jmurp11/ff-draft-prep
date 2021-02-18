import {
  Entity,
  Column,
  BaseEntity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  OneToMany,
  PrimaryColumn
} from 'typeorm';
import { ObjectType, Field, Root } from 'type-graphql';
import { Team } from './Team';
import { Note } from './Note';
import { Projection } from './Projection';

@Entity('players')
@ObjectType()
export class Player extends BaseEntity {
  @Field()
  @PrimaryColumn('int')
  id!: number;

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

  @Field({ nullable: true })
  @Column('int', { nullable: true })
  heightFeet!: number;

  @Field({ nullable: true })
  @Column('int', { nullable: true })
  heightInches!: number;

  @Field()
  height(@Root() parent: Player): string {
    return `${parent.heightFeet}'${parent.heightInches}`;
  }

  @Field({ nullable: true })
  @Column('int', { nullable: true })
  weight!: number;

  @ManyToOne(() => Team, {
    eager: true
  })
  @JoinColumn({ name: 'team' })
  @Field(() => Team, { nullable: true })
  @Column('int', { nullable: true })
  team!: number;

  @Field()
  @Column('text')
  position!: string;

  @Field()
  @Column('text')
  status!: string;

  @Field({ nullable: true })
  @Column('int', { nullable: true })
  depthChart!: number;

  @Field()
  @Column('text')
  photoUrl!: string;

  @Field(() => String, { nullable: true })
  @Column('text', { nullable: true })
  birthDate: string;

  @Field()
  age(@Root() parent: Player): number {
    const today = new Date();
    const birthDate = new Date(parent.birthDate);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }

  @Field({ nullable: true })
  @Column('text', { nullable: true })
  college!: string;

  @Field({ nullable: true })
  @Column('int', { nullable: true })
  draftYear!: number;

  @Field({ nullable: true })
  @Column('int', { nullable: true })
  draftRound!: number;

  @Field({ nullable: true })
  @Column('int', { nullable: true })
  draftPick!: number;

  @Field()
  @Column('boolean')
  isUndrafted!: boolean;

  @Field({ nullable: true })
  @Column('float', { nullable: true })
  averageDraftPosition: number;

  @OneToOne(() => Projection, projection => projection.player)
  @Field(() => Projection, { nullable: true })
  projection: Projection;

  @OneToMany(() => Note, note => note.player)
  @Field(() => [Note], { nullable: true })
  notes: Note[];
}