import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { Apollo } from 'apollo-angular';
import { PlayerService } from '../player-table/player.service';
import { DraftStateService } from '../player-table/draft-state.service';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent implements OnInit {
  form: FormGroup;
  titleIsValid = true;
  noteIsValid = true;
  loading = false;

  constructor(
    private _player: PlayerService,
    private _draftState: DraftStateService,
    private _auth: AuthService,
    private apollo: Apollo,
    private snackbar: MatSnackBar) { }

  ngOnInit() {
    this.form = new FormGroup({
      title: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      note: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required, Validators.minLength(5)]
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

    const user = this._auth.getCurrentUser();
    const title = this.form.get('title').value;
    const note = this.form.get('note').value;
    const source = this.form.get('source').value;
    const date = new Date().toString();

    this.loading = true;

    this.callAddNoteMutation(user, title, date, note, source);

    this.form.reset
  }

  onCancel() {
    this.form.reset
  }

  callAddNoteMutation(user: string, title: string, date: string, note: string, source: string) {
    console.log('Add note called');
  }
}
