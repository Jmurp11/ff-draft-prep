import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { PlayerGqlService } from 'src/app/draft/player/player-gql.service';
import { UserQueryService } from 'src/app/shared/user/user-query.service';
import { LayoutService } from '../layout.service';
import * as fromApp from '../../store/app.reducer';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {
  auth$: Subscription;
  players$: Subscription;
  layout$: Subscription;
  users$: Subscription;
  isAuth: boolean;
  isSearchActive: boolean;
  searchType: boolean;
  userId: string;
  username: string;
  players: any;
  users: any;
  hasNotifications: boolean;

  constructor(
    public dialog: MatDialog,
    private _auth: AuthService,
    private _layout: LayoutService,
    private _player: PlayerGqlService,
    private _user: UserQueryService,
    private router: Router,
    private store: Store<fromApp.AppState>
  ) { }

  ngOnInit() {
    this.hasNotifications = false;
    this.auth$ = this.store.select('user')
      .subscribe(data => {
        this.isAuth = !!data.user;

        if (data.user) {
          this.userId = data.user.id;
          this.username = data.user.username;

          this.users$ = this._user.users().subscribe(({ data }) => this.users = data.users);
          this.players$ = this._player.players(this.userId).subscribe(({ data }) => this.players = data.players);
        }
      });

    this.layout$ = this._layout.isSearchActive.subscribe(isActive => this.isSearchActive = isActive);
  }

  goToDashboard() {
    return this.router.navigate(['/dashboard']);
  }

  navigateToLoginPage() {
    return this.router.navigate(['/a/login']);
  }

  navigateToRegisterPage() {
    return this.router.navigate(['/a/register']);
  }

  navigateToUserProfile() {
    return this.router.navigate([`/u/profile/${this.username}`]);
  }

  navigateToDraft(num: number) {
    if (num === 1) {
      this.router.navigate([`/d/draft/${this.username}/draft-prep`]);
    } else if (num === 2) {
      this.router.navigate([`/d/draft/draft-lobby`]);
    } else {
      throw new Error('Number must be 1 or 2');
    }
  }

  search(val: boolean) {
    this.setSearch(true);
    this.setSearchType(val);
    return;
  }

  setSearch(isActive: boolean) {
    this._layout.setIsSearchActive(isActive);
  }

  setSearchType(val: boolean) {
    return this.searchType = val;
  }

  clearSearch() {
    return this.setSearch(false);
  }

  logout() {
    return this._auth.logout(this.userId);
  }

  ngOnDestroy() {
    if (this.auth$) {
      this.auth$.unsubscribe();
    }
    if (this.players$) {
      this.players$.unsubscribe();
    }
    if (this.layout$) {
      this.layout$.unsubscribe();
    }
    if (this.users$) {
      this.users$.unsubscribe();
    }
  }
}
