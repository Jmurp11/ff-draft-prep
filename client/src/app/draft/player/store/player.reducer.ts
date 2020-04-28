import { UPDATE_PLAYER, UpdatePlayer } from './player.action';
import { Player } from '../player.model';

export interface State {
  player: Player;
}

const initialState: State = {
  player: null
};

export const playerReducer = (state: State = initialState, action: UpdatePlayer) => {
  switch (action.type) {
    case UPDATE_PLAYER:
      return {
        ...state,
        player: action.payload
      }
    default:
      return state;
  }
};
