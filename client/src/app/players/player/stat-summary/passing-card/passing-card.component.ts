import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-passing-card',
  templateUrl: './passing-card.component.html',
  styleUrls: ['./passing-card.component.scss']
})
export class PassingCardComponent implements OnInit, OnChanges {

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
