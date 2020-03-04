import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-auth-modal',
  templateUrl: './auth-modal.component.html',
  styleUrls: ['./auth-modal.component.css']
})
export class AuthModalComponent implements OnInit {
  isLogin: boolean;

  constructor(
    public dialogRef: MatDialogRef<AuthModalComponent>
    ) { }

  ngOnInit() {
    this.isLogin = true;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
