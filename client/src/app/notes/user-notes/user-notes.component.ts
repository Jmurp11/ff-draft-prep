import { Component, OnInit, OnDestroy } from '@angular/core';
import { userNotes } from '../queries';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../auth/auth.service';
import { Apollo } from 'apollo-angular';
import { Note } from '../note.model';
import { User } from '../../auth/user.model';
import { Subscription } from 'rxjs';
import { NoteService } from '../note.service';

@Component({
  selector: 'app-user-notes',
  templateUrl: './user-notes.component.html',
  styleUrls: ['./user-notes.component.css']
})
export class UserNotesComponent implements OnInit, OnDestroy {
  user$: Subscription;
  query$: Subscription;
  like$: Subscription;
  share$: Subscription;
  curUser: User;
  backgroundColor: string;
  notes: Note[];
  loading: boolean;

  constructor(
    private apollo: Apollo,
    private _auth: AuthService,
    private _note: NoteService,
    private snackbar: MatSnackBar
  ) { }

  ngOnInit() {
    this.loading = true;
    this.notes = [];

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
        if (this.notes.length > 0) {
          this._note.setHasNotes(true);
        } else {
          this._note.setHasNotes(false);

        }
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
    if (this.query$) {
      this.query$.unsubscribe();
    }
    if (this.user$) {
      this.user$.unsubscribe();
    }
    if (this.like$) {
      this.like$.unsubscribe();
    }
    if (this.like$) {
      this.like$.unsubscribe();
    }
  }
}
