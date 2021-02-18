import { Component, OnInit, OnChanges, SimpleChanges, Input } from '@angular/core';

@Component({
  selector: 'app-target-share-card',
  templateUrl: './target-share-card.component.html',
  styleUrls: ['./target-share-card.component.scss']
})
export class TargetShareCardComponent implements OnInit, OnChanges {

  @Input()
  playerInput: any;

  player: any;
  targetSharePercentage: number;
  targetShareFillValue: string;
  textContent: string;

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    for (const propName in changes) {
      if (changes.hasOwnProperty(propName)) {
        switch (propName) {
          case 'playerInput': {
            this.player = this.playerInput;
            this.targetSharePercentage = .27;
            this.targetShareFillValue = `rotate(${this.targetSharePercentage / 2}turn)`;
            this.textContent = '7.1 Avg Targets PPG';
          }
        }
      }
    }
  }
}
