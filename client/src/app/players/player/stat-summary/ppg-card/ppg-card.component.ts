import { Component, OnInit, OnChanges, Input, SimpleChanges } from '@angular/core';
import { ChartDataSets } from 'chart.js';
import { Chart } from '../../../../ui/chart/chart.model';

@Component({
  selector: 'app-ppg-card',
  templateUrl: './ppg-card.component.html',
  styleUrls: ['./ppg-card.component.scss']
})
export class PpgCardComponent implements OnInit, OnChanges {

  @Input()
  playerInput: any;

  player: any;
  ppgChart: Chart;

  constructor() { }

  ngOnInit(): void { }

  ngOnChanges(changes: SimpleChanges) {
    for (const propName in changes) {
      if (changes.hasOwnProperty(propName)) {
        switch (propName) {
          case 'playerInput': {
            this.player = this.playerInput;

            const ppgData: ChartDataSets[] = [
              { data: [15, 16, 22, 9, 25] }
            ];

            this.ppgChart = {
              type: 'bar',
              dataset: ppgData,
              labels: ['', '', '', '', ''],
              legend: false,
              color: null
            };
          }
        }
      }
    }
  }
}
