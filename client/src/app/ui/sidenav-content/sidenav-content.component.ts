import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { NavStoreService } from '../nav-store.service';

@Component({
  selector: 'app-sidenav-content',
  templateUrl: './sidenav-content.component.html',
  styleUrls: ['./sidenav-content.component.scss']
})
export class SidenavContentComponent implements OnInit, OnDestroy {
  isPlayers: boolean;
  routeSub: Subscription;
  constructor(
    private router: Router,
    private navStore: NavStoreService
  ) { }

  ngOnInit(): void {
    this.router.events
      .subscribe(event => {
        if (event instanceof NavigationEnd) {
          this.navStore.updateCurrentRoute(event.url);
          this.isPlayers = event.url.includes('/players') ? true : false;
        }
      });
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }
}
