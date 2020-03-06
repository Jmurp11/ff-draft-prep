import { Component, OnInit, OnDestroy } from '@angular/core';
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
export class NoteComponent implements OnInit, OnDestroy {
  authSub$: Subscription;
  form: FormGroup;
  curPlayer$: Subscription;
  currentPlayer: Player;
  backgroundColor: string;
  titleIsValid = true;
  noteIsValid = true;
  userId: string;
  loading: boolean;
  dismiss = 'Dismiss';

  constructor(
    private _player: PlayerService,
    private _auth: AuthService,
    private _note: NoteService,
    private snackbar: MatSnackBar) { }

  ngOnInit() {
    this.loading = false;

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

  onSubmit() {
    if (!this.form.valid) {
      return;
    }

    this.loading = true;

    const user = this.userId;
    const player = this.currentPlayer.player.id;
    const title = this.form.get('title').value;
    const body = this.form.get('note').value;
    const source = this.form.get('source').value;

    const response = this._note.createNote(user, player, title, body, source, false);

    this.openSnackBar(response.message, this.dismiss);
    this.resetForm();
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
  }
}
