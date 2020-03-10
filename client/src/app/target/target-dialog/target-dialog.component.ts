import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { TargetService } from '../target.service';

@Component({
  selector: 'app-target-dialog',
  templateUrl: './target-dialog.component.html',
  styleUrls: ['./target-dialog.component.css']
})
export class TargetDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<TargetDialogComponent>,
    private _target: TargetService
  ) { }

  ngOnInit() { }

  cancel(): void {
    this.dialogRef.close();
  }
}
