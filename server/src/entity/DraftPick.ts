import {
    Entity,
    Column,
    BaseEntity,
    PrimaryGeneratedColumn,
    ManyToOne
} from 'typeorm';
import { User, Draft, Player } from './index';
import { ObjectType, Field } from 'type-graphql';

@Entity('draft-picks')
@ObjectType()
export class DraftPick extends BaseEntity {
    @Field()
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @ManyToOne(() => User, user => user.draftPicks)
    @Field(() => User)
    @Column('uuid')
    user!: string;

    @ManyToOne(() => Player, player => player.draftPick)
    @Field(() => Player)
    @Column()
    player!: number;

    @Field()
    @Column('int')
    pickNumber: number;

    @Field(() => Date)
    @Column('timestamp')
    creationTime!: string;

    @ManyToOne(() => Draft, draft => draft.draftPicks)
    @Field(() => Draft)
    @Column('uuid')
    draft: string;
}