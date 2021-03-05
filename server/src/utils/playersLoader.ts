import DataLoader from 'dataloader';
import { NoteReference } from '../entity/NoteReference';
import { In } from 'typeorm';
import { Player } from '../entity/Player';

const batchPlayers = async (noteIds: readonly string[]) => {
    let gIds: string[] = [];

    noteIds.forEach(id => gIds.push(id));

    console.log(gIds);

    const noteReferences = await NoteReference.find({
        join: {
            alias: 'noteReference',
            innerJoinAndSelect: {
                player: 'noteReference.player'
            }
        },
        where: {
            noteId: In(gIds)
        }
    });

    const noteIdToPlayers: { [key: string]: Player[] } = {};

    noteReferences.forEach(nr => {
        if (nr.noteId in noteIdToPlayers) {
            noteIdToPlayers[nr.noteId].push((nr as any).__player__);
        } else {
            noteIdToPlayers[nr.noteId] = [(nr as any).__player__];
        }
    });

    return noteIds.map(noteId => noteIdToPlayers[noteId]);
}

export const createPlayersLoader = () => new DataLoader(batchPlayers);