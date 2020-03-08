import { Component, OnInit } from '@angular/core';
import { userNotes } from '../queries';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../auth/auth.service';
import { Apollo } from 'apollo-angular';
import { Note } from '../note.model';
import { User } from '../../auth/user.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-notes',
  templateUrl: './user-notes.component.html',
  styleUrls: ['./user-notes.component.css']
})
export class UserNotesComponent implements OnInit {
  user$: Subscription;
  query$: Subscription;
  curUser: User;
  backgroundColor: string;
  notes: Note[];

  loading: boolean;

  constructor(
    private apollo: Apollo,
    private _auth: AuthService,
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
      });
  }

  openSnackBar(message: string, action: string) {
    this.snackbar.open(message, action, {
      duration: 5000
    });
  }

  ngOnDestroy() {
    this.query$.unsubscribe();
    this.user$.unsubscribe();
  }
}
