import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Apollo } from 'apollo-angular';
import { Player } from '../../player-table/Player';
import { PlayerService } from '../../player-table/player.service';

@Component({
  selector: 'app-note-card',
  templateUrl: './note-card.component.html',
  styleUrls: ['./note-card.component.css']
})
export class NoteCardComponent implements OnInit, OnDestroy {
  _currentPlayer: Subscription;
  currentPlayer: Player;
  backgroundColor: string;
  notes = [];

  constructor(
    private _player: PlayerService,
    private apollo: Apollo
  ) { }

  ngOnInit() {
    this._currentPlayer = this._player.currentPlayer.subscribe(data => {
      this.currentPlayer = data;
      switch (this.currentPlayer.player.position) {
        case 'QB':
          this.backgroundColor = 'lightskyblue';
          break;
        case 'RB':
          this.backgroundColor = 'lightgreen';
          break;
        case 'WR':
          this.backgroundColor = 'lightpink';
          break;
        case 'TE':
          this.backgroundColor = 'lightgoldenrodyellow';
          break;
      }
    });
  }

  notesQuery(player: number) {

  }

  ngOnDestroy() {
    this._currentPlayer.unsubscribe();
  }
}
