import { Component, EventEmitter, OnInit, Output } from '@angular/core';
@Component({
  selector: 'app-nav-content',
  templateUrl: './nav-content.component.html',
  styleUrls: ['./nav-content.component.scss']
})
export class NavContentComponent implements OnInit {

  @Output()
  sidenavClose = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  closeSidenav() {
    this.sidenavClose.emit();
  }
}
