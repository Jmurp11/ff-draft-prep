import { Component, OnInit, Input } from '@angular/core';
import { Player } from '../../player.model';

@Component({
  selector: 'app-player-stats',
  templateUrl: './player-stats.component.html',
  styleUrls: ['./player-stats.component.css']
})
export class PlayerStatsComponent implements OnInit {

  @Input()
  playerInput: Player;

  player: Player;

  constructor() { }

  ngOnInit() {
    this.player = this.playerInput;
  }

  divide(val1: number, val2: number) {
    return val1 / val2;
  }

  add(val: number[]) {
    let sum = 0;

    val.forEach(num => sum = sum + num);

    return sum;
  }
}
