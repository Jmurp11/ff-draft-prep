import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { NavigateService } from '../../shared/navigate.service';

@Component({
  selector: 'app-nav-header',
  templateUrl: './nav-header.component.html',
  styleUrls: ['./nav-header.component.scss']
})
export class NavHeaderComponent implements OnInit, OnChanges {
  @Input()
  image: string;

  @Output()
  sidenavClose = new EventEmitter();

  subSink: Subscription;
  defaultImage: string = 'https://www.w3schools.com/howto/img_avatar.png';
  profileImage: string;

  constructor(
    private _navigate: NavigateService
  ) { }

  ngOnInit(): void { }

  ngOnChanges(changes: SimpleChanges): void {
    for (const propName in changes) {
      if (changes.hasOwnProperty(propName)) {
        switch (propName) {
          case 'image': {
            this.profileImage = this.image;
            break;
          }
        }
      }
    }
  }

  closeSidenav() {
    this.sidenavClose.emit();
  }

  onProfileClick() {
    this._navigate.navigate('profile');
    this.closeSidenav();
  }
}
