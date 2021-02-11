import { Component, Input, OnInit } from '@angular/core';
import { Player } from '../../../sdk/generated/graphql';

@Component({
  selector: 'app-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.scss']
})
export class AccordionComponent implements OnInit {
  @Input()
  player: Player;

  currentYear: number;

  constructor() { }

  ngOnInit(): void {
    this.currentYear = new Date().getFullYear();
  }

}
