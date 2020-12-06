import { User } from './shared/user';
export interface StoreState {
  currentUser: User | null;
  scoringType: string | null;
  currentPlayer: number | null;
  currentRoute: string | null;
}
