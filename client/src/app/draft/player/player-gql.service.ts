import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { player, players, avgTargetRound, depthChart } from './queries';

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

  avgTargetRound(id: string) {
    return this.apollo.watchQuery<any>({
      query: avgTargetRound,
      variables: {
        player: id
      }
    }).valueChanges;
  }

  depthChart(team: number, position: string) {
    return this.apollo.watchQuery<any>({
      query: depthChart,
      variables: {
        team,
        position
      }
    }).valueChanges;
  }
}
