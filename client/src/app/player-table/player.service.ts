import { Injectable } from '@angular/core';
import { Player } from './Player';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  currentPlayer = new BehaviorSubject<Player>(null);

  constructor() { }

  updateCurrentPlayer(player: Player) {
    this.currentPlayer.next(player);
    console.log(this.currentPlayer);
  }

}
