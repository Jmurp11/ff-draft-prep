import {
    Entity,
    Column,
    BaseEntity,
    JoinColumn,
    PrimaryGeneratedColumn,
    ManyToOne
} from 'typeorm';
import { Player } from './Player';
import { User } from './User';
import { ObjectType, Field } from 'type-graphql';
import { Folder } from './Folder';

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

    @ManyToOne(() => Player, {
        eager: true
    })
    @JoinColumn({ name: 'player' })
    @Field(() => Player)
    @Column('int')
    player!: number;

    @ManyToOne(() => Folder)
    @JoinColumn({ name: 'folder' })
    @Field(() => Folder, { nullable: true})
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
}
