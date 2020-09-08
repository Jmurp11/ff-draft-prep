import {
    Entity,
    Column,
    BaseEntity,
    PrimaryGeneratedColumn,
    OneToMany
} from 'typeorm';
import { ObjectType, Field } from 'type-graphql';
import { DraftPick } from './DraftPick';

@Entity('drafts')
@ObjectType()
export class Draft extends BaseEntity {
    @Field()
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Field()
    @Column('text')
    type: string;

    @Field()
    @Column('int')
    numOfTeams: number;

    @Field()
    @Column()
    timePerPick: number;

    @Field(() => Boolean)
    @Column({ default: true })
    isActive: boolean;

    @Field(() => Date)
    @Column('timestamp')
    creationTime!: string;

    @Field(() => [DraftPick], { nullable: true })
    @OneToMany(() => DraftPick, draftPick => draftPick.user, {
        eager: true,
        onDelete: 'CASCADE'
    })
    draftPicks: DraftPick[];
}