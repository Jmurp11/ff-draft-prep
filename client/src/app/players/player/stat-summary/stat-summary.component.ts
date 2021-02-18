import { SimpleChanges } from '@angular/core';
import { Component, Input, OnChanges, OnInit } from '@angular/core';

@Component({
  selector: 'app-stat-summary',
  templateUrl: './stat-summary.component.html',
  styleUrls: ['./stat-summary.component.scss']
})
export class StatSummaryComponent implements OnInit, OnChanges {

  @Input()
  playerInput: any;

  player: any;

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    for (const propName in changes) {
      if (changes.hasOwnProperty(propName)) {
        switch (propName) {
          case 'playerInput': {
            this.player = this.playerInput;

          }
        }
      }
    }
  }
}
