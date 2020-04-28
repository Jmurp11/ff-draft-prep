import { Component, OnDestroy, Input, SimpleChanges, OnChanges, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from '../../auth/user.model';
import { Subscription } from 'rxjs';
import { NotesMutationsService } from '../notes-mutations.service';
import { NoteService } from '../note.service';
import { Router } from '@angular/router';
import {Store} from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';

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

  @Input()
  isTableInput: boolean;

  auth$: Subscription;
  like$: Subscription;
  share$: Subscription;
  delete$: Subscription;
  hasNotes$: Subscription;
  currentUser: User;
  notes: any;
  userId: string;
  loading: boolean;
  hasNotes: boolean;
  isTable: boolean;

  constructor(
    private _note: NoteService,
    private _noteM: NotesMutationsService,
    private router: Router,
    private snackbar: MatSnackBar,
    private store: Store<fromApp.AppState>
  ) { }

  ngOnInit() {
    this.loading = true;

    this.auth$ = this.store.select('user')
      .subscribe(data => this.currentUser = data.user);

    this.like$ = this._note.likeStatus.subscribe(response => {
      if (response) {
        this.openSnackBar(response.message, 'Dismiss');
        this._note.resetResponse();
      }
    });

    this.delete$ = this._note.deleteStatus.subscribe(response => {
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
          case 'isTableInput': {
            this.isTable = this.isTableInput;
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
    this._noteM.deleteNote(note.id, this.currentUser.id, note.player.id);
  }

  addComment(note: any) {
    console.log('Add comment');
  }

  addLike(note: any) {
    this._noteM.addLike(this.currentUser.id, note.id);
  }

  createShare(note: any) {
    this._noteM.createShare(this.currentUser.id, note.id);
  }

  navigateToNote(note: string) {
    this.router.navigate([`./n/note/${note}`]);
  }

  navigateToProfile(username: string) {
    this.router.navigate([`./u/profile/${username}`]);
  }

  navigateToPlayer(player: string) {
    this.router.navigate([`./d/player/${player}`]);
  }

  getCount(arr: any) {
    let count = 0;
    arr.forEach(el => count++);
    return count;
  }

  ngOnDestroy() {
    if (this.auth$) {
      this.auth$.unsubscribe();
    }
    if (this.like$) {
      this.like$.unsubscribe();
    }
    if (this.share$) {
      this.share$.unsubscribe();
    }
    if (this.delete$) {
      this.delete$.unsubscribe();
    }
  }
}
