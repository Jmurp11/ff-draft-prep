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
  userId: string;

  constructor(
    public dialog: MatDialog,
    private _auth: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.authSub$ = this._auth.user.subscribe(user => {
      this.isAuth = !!user;

      if (user) {
        this.userId = user.id;
      }
    });
  }

  navigateToLoginPage() {
    this.router.navigate(['/login']);
  }

  navigateToRegisterPage() {
    this.router.navigate(['/register']);
  }

  goToDashboard() {
    this.router.navigate(['./dashboard']);
  }

  goToDraft() {
    this.router.navigate(['./draft']);
  }

  logout() {
    this._auth.logout(this.userId);
  }

  ngOnDestroy() {
    this.authSub$.unsubscribe();
  }
}
