import { Component, OnDestroy, AfterContentInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Player } from '../../draft/player-table/player.model';
import { PlayerService } from '../../draft/player-table/player.service';
import { Note } from '../note.model';
import { userNotes } from '../queries';
import { Apollo } from 'apollo-angular';
import { AuthService } from '../../auth/auth.service';
import { User } from 'src/app/auth/user.model';
import { NoteService } from '../note.service';

@Component({
  selector: 'app-draft-notes',
  templateUrl: './draft-notes.component.html',
  styleUrls: ['./draft-notes.component.css']
})
export class DraftNotesComponent implements AfterContentInit, OnDestroy {
  user$: Subscription;
  curPlayer$: Subscription;
  query$: Subscription;
  like$: Subscription;
  share$: Subscription;
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

    this.like$ = this._note.likeStatus.subscribe(response => {
      if (response) {
        this.openSnackBar(response.message, 'Dismiss');
        this._note.resetResponse();
      }
    });

    this.share$ = this._note.shareStatus.subscribe(response => {
      if (response) {
        this.openSnackBar(response.message, 'Dismiss');
        this._note.resetResponse();
      }
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

  addLike(note: any) {
    this._note.addLike(this.curUser.id, note.id);
  }

  createShare(note: any) {
    this._note.createShare(this.curUser.id, note.id);
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
    if (this.like$) {
      this.like$.unsubscribe();
    }
    if (this.share$) {
      this.share$.unsubscribe();
    }
  }
}
