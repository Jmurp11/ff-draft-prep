import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthStoreService } from 'src/app/auth/auth-store.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit, OnDestroy {

  isLoading: boolean;
  sidenavLeftOpened: boolean;
  sidenavRightOpened: boolean;
  isAuth: boolean; // temporary, can delete
  userSub: Subscription;

  constructor(
    private authStore: AuthStoreService,
    private router: Router
  ) { }

  ngOnInit() {
    this.userSub = this.authStore.stateChanged
      .subscribe(state => {
        if (state.currentUser) {
          if (state.currentUser.data.me) {
            this.sidenavLeftOpened = true;
            this.sidenavRightOpened = true;
            this.isAuth = true;
          } else {
            this.sidenavLeftOpened = false;
            this.sidenavRightOpened = false;
            this.isAuth = false;
          }
        } else {
          this.sidenavLeftOpened = false;
          this.sidenavRightOpened = false;
          this.isAuth = false;
        }
      });
  }

  navigate(val: string) {
    return this.router.navigate([`/${val}`]);
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}
