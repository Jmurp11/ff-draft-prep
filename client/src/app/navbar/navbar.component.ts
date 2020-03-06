import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

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
    private router: Router
  ) { }

  ngOnInit() {
    this.authSub$ = this._auth.user.subscribe(user => {
      this.isAuth = !!user;
    });
  }

  navigateToLoginPage() {
    this.router.navigate(['/login']);
  }

  navigateToRegisterPage() {
    this.router.navigate(['/register']);
  }

  ngOnDestroy() {
    this.authSub$.unsubscribe();
  }
}
