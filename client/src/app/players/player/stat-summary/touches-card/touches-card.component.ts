import { Component, OnInit, OnChanges, Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-touches-card',
  templateUrl: './touches-card.component.html',
  styleUrls: ['./touches-card.component.scss']
})
export class TouchesCardComponent implements OnInit, OnChanges {

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
