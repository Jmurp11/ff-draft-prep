import { Component, OnDestroy, AfterContentInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { PlayerService } from '../../player-table/player.service';
import { AuthService } from '../../auth/auth.service';
import { Player } from '../../player-table/player.model';
import { NoteService } from '../note.service';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent implements AfterContentInit, OnDestroy {
  authSub$: Subscription;
  curPlayer$: Subscription;
  noteStatus$: Subscription;
  form: FormGroup;
  currentPlayer: Player;
  backgroundColor: string;
  userId: string;
  loading: boolean;
  sources: string[];
  dismiss = 'Dismiss';
  titleIsValid = true;
  noteIsValid = true;

  constructor(
    private _player: PlayerService,
    private _auth: AuthService,
    private _note: NoteService,
    private snackbar: MatSnackBar) { }

  ngAfterContentInit() {
    this.loading = false;

    this.sources = [
      'CBS',
      'ESPN',
      'Local News',
      'Twitter',
      'Yahoo',
      'None'
    ];

    this._note.noteStatus.subscribe(response => {
      if (response) {
        this.openSnackBar(response.message, this.dismiss);
        this.resetForm();
      }
    });

    this.authSub$ = this._auth.user.subscribe(user => {
      this.userId = user.id;
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

    this.form = new FormGroup({
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
    const player = this.currentPlayer.player.id;
    const title = this.form.get('title').value;
    const body = this.form.get('note').value;
    const source = this.form.get('source').value;
    const isPrivate = this.form.get('isPrivate').value;

    this.loading = true;

    console.log(source);
    this._note.createNote(user, player, title, body, source, isPrivate);
  }

  onCancel() {
    this.form.reset();
  }

  resetForm() {
    this.form.reset();
    this.noteIsValid = true;
    this.titleIsValid = true;
    this.loading = false;
  }

  openSnackBar(message: string, action: string) {
    this.snackbar.open(message, action, {
      duration: 5000
    });
  }

  ngOnDestroy() {
    this.authSub$.unsubscribe();
    this.curPlayer$.unsubscribe();
    this.noteStatus$.unsubscribe();
  }
}
