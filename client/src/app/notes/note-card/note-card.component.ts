import { Component, OnDestroy, AfterContentInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Player } from '../../player-table/player.model';
import { PlayerService } from '../../player-table/player.service';
import { Note } from '../note.model';
import { userNotes } from '../queries';
import { Apollo } from 'apollo-angular';
import { AuthService } from '../../auth/auth.service';
import { User } from 'src/app/auth/user.model';
import { NoteService } from '../note.service';

@Component({
  selector: 'app-note-card',
  templateUrl: './note-card.component.html',
  styleUrls: ['./note-card.component.css']
})
export class NoteCardComponent implements AfterContentInit, OnDestroy {
  user$: Subscription;
  curPlayer$: Subscription;
  query$: Subscription;
  currentPlayer: Player;
  curUser: User;
  backgroundColor: string;
  notes: Note[];
  playerNotes: Note[];
  loading: boolean;

  constructor(
    private apollo: Apollo,
    private _auth: AuthService,
    private _player: PlayerService,
    private snackbar: MatSnackBar,
    private _note: NoteService
  ) { }

  ngAfterContentInit() {
    this.loading = true;
    this.notes = [];
    this.playerNotes = [];

    this.user$ = this._auth.user.subscribe(user => {
      this.curUser = user;
    });

    this.query$ = this.apollo.watchQuery<any>({
      query: userNotes,
      variables: {
        user: this.curUser.id
      }
    })
      .valueChanges
      .subscribe(({ data, loading }) => {
        this.loading = loading;
        this.notes = data.userNotes;

        this.curPlayer$ = this._player.currentPlayer.subscribe(data => {
          this.currentPlayer = data;
          this.playerNotes = [];
          this.notes.forEach(note => {
            if (note.player.id === this.currentPlayer.player.id) {
              this.playerNotes.push(note);
            }
          });

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
      });
  }

  openSnackBar(message: string, action: string) {
    this.snackbar.open(message, action, {
      duration: 5000
    });
  }


  deleteNote(note: any) {
    this._note.deleteNote(note.id, this.curUser.id);
  }

  ngOnDestroy() {
    if (this.curPlayer$) {
      this.curPlayer$.unsubscribe();
    }
    if (this.query$) {
      this.query$.unsubscribe();
    }
    if (this.user$) {
      this.user$.unsubscribe();
    }
  }
}
