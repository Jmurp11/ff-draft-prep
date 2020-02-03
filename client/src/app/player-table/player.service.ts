import { Injectable } from '@angular/core';
import { Player } from './Player';
import { ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  currentPlayer = new ReplaySubject<Player>();

  constructor() { }

  updateCurrentPlayer(player: Player) {
    this.currentPlayer.next(player);
  }

}
