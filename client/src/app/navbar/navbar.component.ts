import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { AuthModalComponent } from '../auth/auth-modal/auth-modal.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {
  authSub$: Subscription;
  isAuth: boolean;

  constructor(
    public dialog: MatDialog,
    private _auth: AuthService,
  ) { }

  ngOnInit() {
    this.authSub$ = this._auth.user.subscribe(user => {
      if (user) {
        this.isAuth = true;
      } else {
        this.isAuth = false;
      }
    });
  }

  openDialog() {
    this.dialog.open(AuthModalComponent, {
      width: '500px'
    });
  }

  ngOnDestroy() {
    this.authSub$.unsubscribe();
  }
}
