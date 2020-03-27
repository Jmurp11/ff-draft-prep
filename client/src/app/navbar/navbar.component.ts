import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  authSub$: Subscription;
  isAuth: boolean;
  userId: string;
  username: string;

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
        this.username = user.username;
      }
    });
  }

  goToDashboard() {
    this.router.navigate(['/dashboard']);
  }

  navigateToLoginPage() {
    this.router.navigate(['/auth/login']);
  }

  navigateToRegisterPage() {
    this.router.navigate(['/auth/register']);
  }

  navigateToUserProfile() {
    this.router.navigate([`/user/profile/${this.username}`]);
  }
}
