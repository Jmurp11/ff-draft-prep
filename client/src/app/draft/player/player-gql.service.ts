import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { player, players } from './queries';

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
}
