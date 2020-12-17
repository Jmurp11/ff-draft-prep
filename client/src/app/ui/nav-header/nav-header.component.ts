import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { NavigateService } from 'src/app/shared/navigate.service';

@Component({
  selector: 'app-nav-header',
  templateUrl: './nav-header.component.html',
  styleUrls: ['./nav-header.component.scss']
})
export class NavHeaderComponent implements OnInit, OnChanges {
  @Input()
  image: string;

  subSink: Subscription;
  defaultImage: string = 'https://www.w3schools.com/howto/img_avatar.png';
  profileImage: string;

  constructor(
    public _navigate: NavigateService
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
}
