import { Action } from '@ngrx/store';
import { Player } from '../player.model';

export const UPDATE_PLAYER = '[PLAYER] Update Player';

export class UpdatePlayer implements Action {
  readonly type = UPDATE_PLAYER;

  constructor(public payload: Player) { }
}
