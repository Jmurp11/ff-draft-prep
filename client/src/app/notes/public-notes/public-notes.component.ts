import { Component, OnInit, OnDestroy } from '@angular/core';
import { publicNotes } from '../queries';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../auth/auth.service';
import { Apollo } from 'apollo-angular';
import { Note } from '../note.model';
import { Subscription } from 'rxjs';
import { NoteService } from '../note.service';
import { User } from '../../auth/user.model';

@Component({
  selector: 'app-public-notes',
  templateUrl: './public-notes.component.html',
  styleUrls: ['./public-notes.component.css']
})
export class PublicNotesComponent implements OnInit, OnDestroy {
  query$: Subscription;
  user$: Subscription;
  backgroundColor: string;
  notes: Note[];
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
      query: publicNotes
    })
      .valueChanges
      .subscribe(({ data, loading }) => {
        this.loading = loading;
        this.notes = data.publicNotes;
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

  ngOnDestroy() {
    this.query$.unsubscribe();
    this.user$.unsubscribe();
  }
}
