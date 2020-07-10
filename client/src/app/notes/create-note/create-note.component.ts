import { Component, OnDestroy, AfterContentInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { Subscription, Observable } from 'rxjs';
import { map, startWith, filter } from 'rxjs/operators';
import { MatDialogRef } from '@angular/material/dialog';
import { Player } from '../../draft/player/player.model';
import { NoteDialogComponent } from '../note-dialog/note-dialog.component';
import { NotesMutationsService } from '../notes-mutations.service';
import { NoteService } from '../note.service';
import { User } from '../../auth/user.model';
import { NotesQueriesService } from '../notes-queries.service';
import * as fromApp from '../../store/app.reducer';

@Component({
  selector: 'app-create-note',
  templateUrl: './create-note.component.html',
  styleUrls: ['./create-note.component.css']
})
export class CreateNoteComponent implements AfterContentInit, OnDestroy {
  authSub$: Subscription;
  curPlayer$: Subscription;
  noteStatus$: Subscription;
  popPlayer$: Subscription;
  clearForm$: Subscription;
  players$: Subscription;
  cancel$: Subscription;

  filteredOptions: Observable<any[]>;
  form: FormGroup;
  currentPlayer: Player;
  backgroundColor: string;
  user: User;
  loading: boolean;
  sources: string[];
  players: any[];
  player: any;
  isPlayerPreSet: boolean;
  isCancelBtnVisible: boolean;
  dismiss: string;
  playerIsValid: boolean;
  titleIsValid: boolean;
  noteIsValid: boolean;

  constructor(
    public dialogRef: MatDialogRef<NoteDialogComponent>,
    private _note: NoteService,
    private _noteM: NotesMutationsService,
    private _noteQ: NotesQueriesService,
    private store: Store<fromApp.AppState>,
    private snackbar: MatSnackBar) { }

  ngAfterContentInit() {
    this.loading = true;
    this.players = [];
    this.player = {
      id: '',
      name: '',
      abbreviation: '',
      position: ''
    };

    this.curPlayer$ = this.store.select('player')
      .subscribe(data => {
        this.currentPlayer = data.player;
      });

    this.dismiss = 'Dismiss';
    this.playerIsValid = true;
    this.titleIsValid = true;
    this.noteIsValid = true;


    this.sources = [
      'CBS',
      'ESPN',
      'Local News',
      'Twitter',
      'Yahoo',
      'None'
    ];

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

    this.popPlayer$ = this._note.populatePlayer
      .subscribe(populate => {
        if (!populate) {
          this.isPlayerPreSet = false;
          this.currentPlayer = null;
        } else {
          this.isPlayerPreSet = true;
          this.form.get('player').setValue(this.currentPlayer.id);
        }
      });

    this.cancel$ = this._note.isCancelBtnVisible
      .subscribe(val => this.isCancelBtnVisible = val);

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

    this.authSub$ = this.store.select('auth')
      .subscribe(data => this.user = data.user);

    this.players$ = this._noteQ.players()
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

    const user = this.user.id;
    let player: string;
    const title = this.form.get('title').value;
    const body = this.form.get('note').value;
    const source = this.form.get('source').value;
    let isPrivate = this.form.get('isPrivate').value;

    if (this.isPlayerPreSet) {
      player = this.currentPlayer.id;
    } else {
      const ph = this.form.get('player').value;
      player = ph.id;
    }

    this.loading = true;

    if (!isPrivate) {
      isPrivate = false;
    }

    this._noteM.createNote(user, player, title, body, source, isPrivate);

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
        return `${player.name} ${player.team.abbreviation} - ${player.position}`;
      }
    } else {
      return `${this.player.name}
        ${this.player.team.abbreviation} - ${this.player.position}`;
    }
  }

  cancel(): void {
    this.dialogRef.close();
    this._note.resetForm(true);
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
    this.resetForm();
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
    if (this.cancel$) {
      this.cancel$.unsubscribe();
    }
  }
}
