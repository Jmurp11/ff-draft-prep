import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {MatDialog, MatDialogRef } from '@angular/material/dialog';
import { NoteService } from '../notes/note.service';
import { NoteDialogComponent } from '../notes/note-dialog/note-dialog.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private _note: NoteService
    ) { }

  ngOnInit() { }

  goToDraft() {
    this.router.navigate(['./draft']);
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
}
