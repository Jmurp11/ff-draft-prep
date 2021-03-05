import { Request, Response } from 'express';
import { createPlayersLoader } from '../utils/playersLoader';
import { createNotesLoader } from '../utils/notesLoader';

export interface MyContext {
    req: Request,
    res: Response,
    payload?: { userId: string },
    notesLoader: ReturnType<typeof createNotesLoader>,
    playersLoader: ReturnType<typeof createPlayersLoader>
}