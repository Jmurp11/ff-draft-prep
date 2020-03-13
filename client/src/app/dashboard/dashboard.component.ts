import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
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
      width: '750px',
      height: '500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  ngOnDestroy() {
    this.hasNotes$.unsubscribe();
  }
}
