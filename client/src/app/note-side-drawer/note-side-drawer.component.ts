import { Component } from '@angular/core';

@Component({
  selector: 'app-note-side-drawer',
  templateUrl: './note-side-drawer.component.html',
  styleUrls: ['./note-side-drawer.component.css']
})
export class NoteSideDrawerComponent {
  events: string[] = [];
  opened: boolean;

  shouldRun = [/(^|\.)plnkr\.co$/, /(^|\.)stackblitz\.io$/].some(h => h.test(window.location.host));
}
