import { NoteArgs } from './sdk/generated/graphql';
import { User } from './shared/user';

export interface StoreState {
  currentUser: User | null;
  scoringType: string | null;
  currentPlayer: number | null;
  rightNavState: boolean;
  noteInput: NoteArgs | null;
}
