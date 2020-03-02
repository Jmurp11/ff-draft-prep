import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { Apollo } from 'apollo-angular';
import { PlayerService } from '../player-table/player.service';
import { createNote } from './queries';
import { Player } from '../player-table/Player';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent implements OnInit {
  form: FormGroup;
  _currentPlayer: Subscription;
  currentPlayer: Player;
  backgroundColor: string;
  titleIsValid = true;
  noteIsValid = true;

  constructor(
    private _player: PlayerService,
    private apollo: Apollo,
    private snackbar: MatSnackBar) { }

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

    const user = '123';
    const player = this.currentPlayer.player.id;
    const title = this.form.get('title').value;
    const body = this.form.get('note').value;
    const source = this.form.get('source').value;

    this.callAddNoteMutation(user, player, title, body, source, false);

    this.form.reset();
  }

  onCancel() {
    this.form.reset();
  }

  callAddNoteMutation(
    user: string, player: number, title: string,
    body: string, source: string, isPrivate: boolean) {
    return this.apollo.mutate({
      mutation: createNote,
      variables: {
        user,
        player,
        title,
        body,
        source,
        isPrivate
      }
    }).subscribe(({ data }) => {
      console.log(JSON.stringify(data));
      if (data.addNote.success[0].message) {
        this.form.reset();
        this.openSnackBar('Success! Note saved!', 'Dismiss');
      } else {
        this.openSnackBar(data.addNote.errors[0].message, 'Dismiss');
      }
    });
  }

  openSnackBar(message: string, action: string) {
    this.snackbar.open(message, action, {
      duration: 5000
    });
  }
}
