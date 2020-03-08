import { Component, OnInit } from '@angular/core';
import { publicNotes } from '../queries';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../auth/auth.service';
import { Apollo } from 'apollo-angular';
import { Note } from '../note.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-public-notes',
  templateUrl: './public-notes.component.html',
  styleUrls: ['./public-notes.component.css']
})
export class PublicNotesComponent implements OnInit {
  query$: Subscription;
  backgroundColor: string;
  notes: Note[];

  loading: boolean;

  constructor(
    private apollo: Apollo,
    private snackbar: MatSnackBar
  ) { }

  ngOnInit() {
    this.loading = true;
    this.notes = [];
    
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

  ngOnDestroy() {
    this.query$.unsubscribe();
  }
}