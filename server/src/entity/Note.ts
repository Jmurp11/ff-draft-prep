import {
    Entity,
    Column,
    BaseEntity,
    JoinColumn,
    PrimaryGeneratedColumn,
    ManyToOne,
    OneToMany
} from 'typeorm';
import { Player } from './Player';
import { User } from './User';
import { ObjectType, Field, Ctx } from 'type-graphql';
import { Folder } from './Folder';
import { NoteReference } from './NoteReference';
import { MyContext } from '../shared';

/**
 * remove player, change to subject
 * fields for fantasy / gambling
 * field for sport (NFL, MLB, NHL etc)
 * 
 * potential issues: 
 *  ** joins on player
 */
@Entity('notes')
@ObjectType()
export class Note extends BaseEntity {
    @Field()
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'user' })
    @Field(() => User)
    @Column('uuid')
    user!: string;

    @ManyToOne(() => Folder)
    @JoinColumn({ name: 'folder' })
    @Field(() => Folder, { nullable: true })
    @Column('uuid', { nullable: true })
    folder: string;

    @Field()
    @Column('text')
    title!: string;

    @Field()
    @Column('text')
    body!: string;

    @Field()
    @Column('boolean', { default: false })
    isPrivate!: boolean;

    @Field(() => Date)
    @Column('timestamp')
    creationTime!: string;

    @Field(() => Date)
    @Column('timestamp')
    updatedTime!: string;

    @OneToMany(() => NoteReference, nr => nr.note, {
        onDelete: 'CASCADE'
    })
    noteConnection: Promise<NoteReference>;

    @Field(() => [Player], { nullable: true })
    async references(@Ctx() { playersLoader }: MyContext): Promise<Player[]> {
        return playersLoader.load(this.id);
    }
}
