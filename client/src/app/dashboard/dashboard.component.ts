import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NoteService } from '../notes/note.service';
import { NoteDialogComponent } from '../notes/note-dialog/note-dialog.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
  hasNotes$: Subscription;
  hasNotes: boolean;

  constructor(
    private dialog: MatDialog,
    private _note: NoteService
  ) { }

  ngOnInit() {
    this.hasNotes$ = this._note.hasNotes.subscribe(hn => {
      this.hasNotes = hn;
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
    if (this.hasNotes$) {
      this.hasNotes$.unsubscribe();
    }
  }
}
