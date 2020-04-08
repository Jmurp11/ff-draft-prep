import { Component, OnDestroy, Input, SimpleChanges, OnChanges, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../auth/auth.service';
import { User } from '../../auth/user.model';
import { Subscription } from 'rxjs';
import { NotesMutationsService } from '../notes-mutations.service';
import { NoteService } from '../note.service';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent implements OnInit, OnChanges, OnDestroy {

  @Input()
  notesInput: any;

  @Input()
  userIdInput: string;

  @Input()
  loadingInput: boolean;

  auth$: Subscription;
  like$: Subscription;
  share$: Subscription;
  hasNotes$: Subscription;
  currentUser: User;
  notes: any;
  userId: string;
  loading: boolean;
  hasNotes: boolean;

  constructor(
    private _auth: AuthService,
    private _note: NoteService,
    private _noteM: NotesMutationsService,
    private snackbar: MatSnackBar
  ) { }

  ngOnInit() {
    this.loading = true;

    this.auth$ = this._auth.user.subscribe(user => this.currentUser = user);

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

  ngOnChanges(changes: SimpleChanges) {
    for (const propName in changes) {
      if (changes.hasOwnProperty(propName)) {
        switch (propName) {
          case 'loadingInput': {
            this.loading = this.loadingInput;
            break;
          }
          case 'userIdInput': {
            this.userId = this.userIdInput;
            break;
          }
          case 'notesInput': {
            this.notes = this.notesInput;
            break;
          }
        }
      }
    }
  }

  openSnackBar(message: string, action: string) {
    this.snackbar.open(message, action, {
      duration: 5000
    });
  }

  deleteNote(note: any) {
    this._noteM.deleteNote(note.id, this.currentUser.id);
  }

  addLike(note: any) {
    this._noteM.addLike(this.currentUser.id, note.id);
  }

  createShare(note: any) {
    this._noteM.createShare(this.currentUser.id, note.id);
  }

  ngOnDestroy() {
    if (this.auth$) {
      this.auth$.unsubscribe();
    }
    if (this.like$) {
      this.like$.unsubscribe();
    }
    if (this.like$) {
      this.like$.unsubscribe();
    }
  }
}
