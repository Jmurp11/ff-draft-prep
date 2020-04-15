import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { NoteService } from '../note.service';

@Component({
  selector: 'app-note-dialog',
  templateUrl: './note-dialog.component.html',
  styleUrls: ['./note-dialog.component.css']
})
export class NoteDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<NoteDialogComponent>,
    private _note: NoteService
  ) { }

  ngOnInit() { }
}
