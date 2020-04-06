import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NoteService } from '../notes/note.service';
import { NoteDialogComponent } from '../notes/note-dialog/note-dialog.component';
import { Subscription } from 'rxjs';
import { Note } from '../notes/note.model';
import { NotesQueriesService } from '../notes/notes-queries.service';
import { UserService } from '../shared/user/user.service';
import { User } from '../shared/user/user.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
  auth$: Subscription;
  notes$: Subscription;
  user$: Subscription;
  hasNotes: boolean;
  notes: any;
  userNotes: any;
  likedNotes: any;
  targets: any;
  userId: string;
  user: User;
  userLoading: boolean;
  noteLoading: boolean;

  constructor(
    private dialog: MatDialog,
    private _note: NoteService,
    private _noteQ: NotesQueriesService,
    private _user: UserService
  ) { }

  ngOnInit() {
    this.user$ = this._user.me().subscribe(({ data, loading }) => {
      this.user = data.me;
      this.userId = this.user.id;
      this.userNotes = this.user.notes;
      this.likedNotes = this.user.likes;
      this.targets = this.user.targets;
      this.userLoading = loading;
      console.log(this.user);
    });

    this.notes$ = this._noteQ.notes().subscribe(({ data, loading }) => {
      this.notes = data.notes;
      this.noteLoading = loading;
    });
  }

  openDialog(): void {
    this._note.prepopulatePlayer(false);
    const dialogRef = this.dialog.open(NoteDialogComponent, {
      width: '850px',
      height: '600px'
    });

    dialogRef.afterClosed().subscribe(result => { });
  }

  ngOnDestroy() {
    if (this.notes$) {
      this.notes$.unsubscribe();
    }
    if (this.user$) {
      this.user$.unsubscribe();
    }
  }
}
