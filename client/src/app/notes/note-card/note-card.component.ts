import { Component, OnDestroy, AfterContentInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Player } from '../../player-table/player.model';
import { PlayerService } from '../../player-table/player.service';
import { Note } from '../note.model';
import { notes } from '../queries';
import { Apollo } from 'apollo-angular';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-note-card',
  templateUrl: './note-card.component.html',
  styleUrls: ['./note-card.component.css']
})
export class NoteCardComponent implements AfterContentInit, OnDestroy {
  curPlayer$: Subscription;
  query$: Subscription;
  currentPlayer: Player;
  backgroundColor: string;
  notes: Note[];
  loading: boolean;

  constructor(
    private _auth: AuthService,
    private apollo: Apollo,
    private _player: PlayerService,
    private snackbar: MatSnackBar
  ) { }

  ngAfterContentInit() {
    this.loading = true;

    this.query$ = this.apollo.watchQuery<any>({
      query: notes
    })
      .valueChanges
      .subscribe(({ data, loading }) => {
        this.loading = loading;
        this.notes = data.notes;
      });

    this.curPlayer$ = this._player.currentPlayer.subscribe(data => {
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

  openSnackBar(message: string, action: string) {
    this.snackbar.open(message, action, {
      duration: 5000
    });
  }

  ngOnDestroy() {
    this.curPlayer$.unsubscribe();
  }
}
