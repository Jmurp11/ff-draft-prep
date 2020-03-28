import { Component, OnInit, OnDestroy } from '@angular/core';
import { likedNotes } from '../queries';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../auth/auth.service';
import { Apollo } from 'apollo-angular';
import { Note } from '../note.model';
import { Subscription } from 'rxjs';
import { NoteService } from '../note.service';
import { User } from '../../auth/user.model';

@Component({
  selector: 'app-liked-notes',
  templateUrl: './liked-notes.component.html',
  styleUrls: ['./liked-notes.component.css']
})
export class LikedNotesComponent implements OnInit, OnDestroy {
  query$: Subscription;
  user$: Subscription;
  like$: Subscription;
  share$: Subscription;
  backgroundColor: string;
  notes: any[];
  curUser: User;
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
      query: likedNotes,
      variables: {
        userId: this.curUser.id,
      }
    })
      .valueChanges
      .subscribe(({ data, loading }) => {
        this.loading = loading;
        this.notes = data.likes;
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

  addLike(note: any) {
    this._note.addLike(this.curUser.id, note.id);
  }

  createShare(note: any) {
    this._note.createShare(this.curUser.id, note.id);
  }

  deleteNote(note: any) {
    this._note.deleteNote(note.id, this.curUser.id);
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
    if (this.share$) {
      this.share$.unsubscribe();
    }
  }
}
