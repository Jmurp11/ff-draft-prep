import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AuthStoreService } from 'src/app/auth/auth-store.service';
import { NavigateService } from 'src/app/shared/navigate.service';
import { User } from 'src/app/shared/user';

@Component({
  selector: 'app-nav-header',
  templateUrl: './nav-header.component.html',
  styleUrls: ['./nav-header.component.scss']
})
export class NavHeaderComponent implements OnInit, OnChanges {
  @Input()
  user: User;

  subSink: Subscription;
  defaultImage: string = 'https://www.w3schools.com/howto/img_avatar.png';
  currentUser: User;

  constructor(
    public _navigate: NavigateService
  ) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    for (const propName in changes) {
      if (changes.hasOwnProperty(propName)) {
        switch (propName) {
          case 'currentUser': {
            this.user = this.currentUser;
            break;
          }
        }
      }
    }
  }
}
