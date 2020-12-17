import { Component, OnInit } from '@angular/core';
import { NavigateService } from '../../shared/navigate.service';

@Component({
  selector: 'app-nav-content',
  templateUrl: './nav-content.component.html',
  styleUrls: ['./nav-content.component.scss']
})
export class NavContentComponent implements OnInit {

  constructor(public _navigate: NavigateService) { }

  ngOnInit(): void {
  }

}
