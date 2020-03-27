import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { Subscribable, Subscription } from 'rxjs';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit, OnDestroy {
  auth$: Subscription;
  isAuth: boolean;
  links: string[];
  userId: string;
  username: string;

  constructor(
    private _auth: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.auth$ = this._auth.user.subscribe(user => {
      this.isAuth = !!user;

      if (user) {
        this.userId = user.id;
        this.username = user.username;
      }
    });

    this.links = [
      './dashboard',
      './draft',
      `./user/profile/${this.username}`
    ];
  }

  navigateTo(link: number) {
    this.router.navigate([this.links[link]]);
  }

  logout() {
    this._auth.logout(this.userId);
  }

  ngOnDestroy() {
    this.auth$.unsubscribe();
  }
}
