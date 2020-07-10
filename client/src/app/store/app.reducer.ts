import { ActionReducerMap } from '@ngrx/store';
import * as fromAuth from '../auth/store/auth.reducer'
import * as fromPlayer from '../draft/player/store/player.reducer';

export interface AppState {
  auth: fromAuth.State;
  player: fromPlayer.State;
}

export const appReducer: ActionReducerMap<AppState> = {
  auth: fromAuth.authReducer,
  player: fromPlayer.playerReducer
};
