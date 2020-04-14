import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { player, players, avgTargetRound } from './queries';

@Injectable({
  providedIn: 'root'
})
export class PlayerGqlService {

  constructor(private apollo: Apollo) { }

  player(id: string) {
    return this.apollo.watchQuery<any>({
      query: player,
      variables: {
        id
      }
    }).valueChanges;
  }

  players(user: string) {
    return this.apollo.watchQuery<any>({
      query: players,
      variables: {
        user
      }
    }).valueChanges;
  }

  avgTargetRound(player: string) {
    return this.apollo.watchQuery<any>({
      query: avgTargetRound,
      variables: {
        player
      }
    }).valueChanges;
  }
}
