import {
    Entity,
    BaseEntity,
    ManyToOne,
    PrimaryColumn
} from 'typeorm';
import { Player } from './Player';
import { Note } from './Note';

@Entity('notesReferences')
export class NoteReference extends BaseEntity {
    @PrimaryColumn()
    noteId: string;

    @PrimaryColumn()
    playerId: number;

    @ManyToOne(() => Note, {
        primary: true
    })
    note!: Promise<Note>;

    @ManyToOne(() => Player, {
        primary: true
    })
    player: Promise<Player>;
}