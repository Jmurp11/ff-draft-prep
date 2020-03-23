import { Component, OnDestroy, AfterContentInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription, Observable } from 'rxjs';
import { map, startWith, filter } from 'rxjs/operators';
import { PlayerService } from '../../player-table/player.service';
import { AuthService } from '../../auth/auth.service';
import { Player } from '../../player-table/player.model';
import { NoteService } from '../note.service';
import { Apollo } from 'apollo-angular';
import { players } from '../queries';
import { MatDialogRef } from '@angular/material/dialog';
import { NoteDialogComponent } from '../note-dialog/note-dialog.component';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent implements AfterContentInit, OnDestroy {
  authSub$: Subscription;
  curPlayer$: Subscription;
  noteStatus$: Subscription;
  popPlayer$: Subscription;
  clearForm$: Subscription;
  players$: Subscription;
  filteredOptions: Observable<any[]>;
  form: FormGroup;
  currentPlayer: Player;
  backgroundColor: string;
  userId: string;
  loading: boolean;
  sources: string[];
  players: any[];
  isPlayerPreSet: boolean;
  dismiss = 'Dismiss';
  playerIsValid = true;
  titleIsValid = true;
  noteIsValid = true;

  constructor(
    private apollo: Apollo,
    private _player: PlayerService,
    private _auth: AuthService,
    public dialogRef: MatDialogRef<NoteDialogComponent>,
    private _note: NoteService,
    private snackbar: MatSnackBar) { }

  ngAfterContentInit() {
    this.loading = true;
    this.players = [];

    this.sources = [
      'CBS',
      'ESPN',
      'Local News',
      'Twitter',
      'Yahoo',
      'None'
    ];

    this.popPlayer$ = this._note.populatePlayer.subscribe(populate => {
      if (!populate) {
        this.isPlayerPreSet = false;
        this.currentPlayer = null;
      } else {
        this.isPlayerPreSet = true;

        this.curPlayer$ = this._player.currentPlayer.subscribe(data => {
          this.currentPlayer = data;
          this.form.get('player').setValue(this.currentPlayer.player.id);

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
    });

    this.form = new FormGroup({
      player: new FormControl(null, {
        updateOn: 'change',
        validators: [Validators.required]
      }),
      title: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      note: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required, Validators.minLength(5)]
      }),
      isPrivate: new FormControl(null, {
        updateOn: 'blur'
      }),
      source: new FormControl(null, {
        updateOn: 'blur'
      })
    });

    this.noteStatus$ = this._note.noteStatus.subscribe(response => {
      if (response) {
        this.openSnackBar(response.message, this.dismiss);
        this.resetForm();
        this._note.resetResponse();
      }
    });

    this.clearForm$ = this._note.clearNoteForm.subscribe(clear => {
      if (clear) {
        this.resetForm();
        this._note.resetForm(false);
      }
    });

    this.authSub$ = this._auth.user.subscribe(user => {
      this.userId = user.id;
    });

    this.players$ = this.apollo.watchQuery<any>({
      query: players
    })
      .valueChanges
      .subscribe(({ data, loading }) => {
        this.loading = loading;
        data.players.forEach((player: any) => {
          this.players.push(player);
        });
      });

    this.filteredOptions = this.form.get('player').valueChanges
      .pipe(
        startWith(''),
        filter(value => value !== null),
        map(value => typeof value === 'string' ? value : value.name),
        map(value => this._filter(value))
      );

    this.form.get('player').statusChanges.subscribe(status => {
      this.playerIsValid = status === 'VALID';
    });

    this.form.get('title').statusChanges.subscribe(status => {
      this.titleIsValid = status === 'VALID';
    });

    this.form.get('note').statusChanges.subscribe(status => {
      this.noteIsValid = status === 'VALID';
    });
  }

  async onSubmit() {
    if (!this.form.valid) {
      return;
    }

    const user = this.userId;
    let player: number;
    const title = this.form.get('title').value;
    const body = this.form.get('note').value;
    const source = this.form.get('source').value;
    let isPrivate = this.form.get('isPrivate').value;

    if (this.isPlayerPreSet) {
      player = this.currentPlayer.player.id;
    } else {
      const ph = this.form.get('player').value;
      player = ph.id;
    }

    this.loading = true;

    if (!isPrivate) {
      isPrivate = false;
    }

    this._note.createNote(user, player, title, body, source, isPrivate);

    if (!this.isPlayerPreSet) {
      this.dialogRef.close();
    }
  }

  _filter(value: string): string[] {
    if (value) {
      const filterValue = value.toLowerCase();
      return this.players.filter(player => player.name.toLowerCase().includes(filterValue));
    }
  }

  displayFn(player: any): string {
    if (!this.isPlayerPreSet) {
      if (player) {
        return `${player.name} ${player.team.team.abbreviation} - ${player.position}`;
      }
    } else {
      return `${this.currentPlayer.player.name}
        ${this.currentPlayer.player.team.team.abbreviation} - ${this.currentPlayer.player.position}`;
    }
  }

  onCancel() {
    this.form.reset();
  }

  resetForm() {
    this.form.reset();
    this.noteIsValid = true;
    this.titleIsValid = true;
    this.playerIsValid = true;
    this.loading = false;
  }

  openSnackBar(message: string, action: string) {
    this.snackbar.open(message, action, {
      duration: 5000
    });
  }

  ngOnDestroy() {
    if (this.authSub$) {
      this.authSub$.unsubscribe();
    }
    if (this.isPlayerPreSet) {
      this.curPlayer$.unsubscribe();
    }
    if (this.noteStatus$) {
      this.noteStatus$.unsubscribe();
    }
    if (this.popPlayer$) {
      this.popPlayer$.unsubscribe();
    }
    if (this.clearForm$) {
      this.clearForm$.unsubscribe();
    }
  }
}
