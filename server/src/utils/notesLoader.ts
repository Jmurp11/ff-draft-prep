import DataLoader from 'dataloader';
import { NoteReference } from '../entity/NoteReference';
import { In } from 'typeorm';
import { Note } from '../entity/Note';

const batchNotes = async (playerIds: readonly number[]) => {
    let gIds: number[] = [];

    playerIds.forEach(id => gIds.push(id));

    const noteReferences = await NoteReference.find({
        join: {
            alias: 'noteReference',
            innerJoinAndSelect: {
                note: 'noteReference.note'
            }
        },
        where: {
            playerId: In(gIds)
        }
    });

    const playerIdToNotes: { [key: string]: Note[] } = {};

    noteReferences.forEach(pr => {
        if (pr.playerId in playerIdToNotes) {
            playerIdToNotes[pr.playerId].push((pr as any).__note__);
        } else {
            playerIdToNotes[pr.playerId] = [(pr as any).__note__];
        }
    });

    return playerIds.map(playerId => playerIdToNotes[playerId]);
}

export const createNotesLoader = () => new DataLoader(batchNotes);