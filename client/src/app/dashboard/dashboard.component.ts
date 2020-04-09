import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NoteService } from '../notes/note.service';
import { NoteDialogComponent } from '../notes/note-dialog/note-dialog.component';
import { Subscription } from 'rxjs';
import { Note } from '../notes/note.model';
import { NotesQueriesService } from '../notes/notes-queries.service';
import { UserQueryService } from '../shared/user/user-query.service';
import { User } from '../shared/user/user.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
  auth$: Subscription;
  likeNotes$: Subscription;
  notes$: Subscription;
  userNotes$: Subscription;
  user$: Subscription;

  notes: Note[];
  userNotes: Note[];

  likedNotes: any;
  targets: any;

  userId: string;
  user: User;

  userLoading: boolean;
  likedNoteLoading: boolean;
  noteLoading: boolean;
  userNoteLoading: boolean;
  hasNotes: boolean;

  constructor(
    private dialog: MatDialog,
    private _note: NoteService,
    private _noteQ: NotesQueriesService,
    private _userQ: UserQueryService
  ) { }

  ngOnInit() {
    this.likedNotes = [];

    this.user$ = this._userQ.me().subscribe(({ data, loading }) => {
      this.user = data.me;
      this.userId = this.user.id;
      this.targets = this.user.targets;
      this.userLoading = loading;

      this.notes$ = this._noteQ.notes(null).subscribe(({ data, loading }) => {
        this.notes = data.notes;
        this.noteLoading = loading;
      });

      this.userNotes$ = this._noteQ.notes(this.userId).subscribe(({ data, loading }) => {
        this.userNotes = data.notes;
        this.userNoteLoading = loading;
        if (this.userNotes.length > 0) {
          this.hasNotes = true;
        }
      });

      this.likeNotes$ = this._noteQ.likes(this.userId).subscribe(({ data, loading }) => {
        this.likedNotes = [];

        data.likes.forEach(like => {
          this.likedNotes.push(like.note);
        });
        this.likedNoteLoading = loading;
      });
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
    if (this.likeNotes$) {
      this.likeNotes$.unsubscribe();
    }
    if (this.userNotes$) {
      this.userNotes$.unsubscribe();
    }
  }
}
