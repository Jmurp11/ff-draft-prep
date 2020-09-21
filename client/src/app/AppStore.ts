import { ApolloQueryResult } from 'apollo-client';
import { Me } from './shared/me';

export interface StoreState {
  currentUser: ApolloQueryResult<Me> | null ;
  scoringType: string | null;
  currentPlayer: number | null;
  currentRoute: string | null;
}
