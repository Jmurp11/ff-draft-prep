import { Component, OnInit } from '@angular/core';
import { AuthStoreService } from './auth/auth-store.service';
import { NavStoreService } from './ui/nav-store.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'client';

  constructor(
    private authStore: AuthStoreService,
    private router: Router,
    private navStore: NavStoreService
  ) { }

  ngOnInit() {
    this.authStore.autoLogin();
    this.navStore.updateCurrentRoute(this.router.url);
  }
}
