import {
    Entity,
    Column,
    BaseEntity,
    JoinColumn,
    PrimaryGeneratedColumn,
    ManyToOne,
    OneToMany
} from 'typeorm';
import { Note } from './Note';
import { User } from './User';
import { ObjectType, Field } from 'type-graphql';

@Entity('folders')
@ObjectType()
export class Folder extends BaseEntity {
    @Field()
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'user' })
    @Field(() => User)
    @Column('uuid')
    user!: string;

    @Field()
    @Column('text')
    title!: string;
    
    @Field(() => [Note], { nullable: true })
    @OneToMany(() => Note, note => note.folder, {
        onDelete: 'CASCADE',
        eager: true
    })
    notes: Note[];

    @Field(() => Date)
    @Column('timestamp')
    creationTime!: string;

    @Field(() => Date)
    @Column('timestamp')
    updatedTime!: string;
}
