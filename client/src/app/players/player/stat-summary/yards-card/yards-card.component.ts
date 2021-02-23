import { Component, OnInit, OnChanges, Input, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ChartDataSets } from 'chart.js';
import { Chart } from '../../../../ui/chart/chart.model';
import { DetailPopUpComponent } from '../detail-pop-up/detail-pop-up.component';

@Component({
  selector: 'app-yards-card',
  templateUrl: './yards-card.component.html',
  styleUrls: ['./yards-card.component.scss']
})
export class YardsCardComponent implements OnInit, OnChanges {

  @Input()
  playerInput: any;

  player: any;
  yardsChart: Chart;
  constructor(
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    for (const propName in changes) {
      if (changes.hasOwnProperty(propName)) {
        switch (propName) {
          case 'playerInput': {
            this.player = this.playerInput;

            const yardsData: ChartDataSets[] = [
              { data: [0, 25, 0, 0, 0], label: 'Pass' },
              { data: [100, 125, 88, 105, 150], label: 'Rush' },
              { data: [25, 27, 50, 100, 15], label: 'Rec' }
            ];

            this.yardsChart = {
              type: 'line',
              dataset: yardsData,
              labels: ['', '', '', '', ''],
              legend: true,
              color: [
                { borderColor: 'red', backgroundColor: 'transparent' },
                { borderColor: 'blue', backgroundColor: 'transparent' },
                { borderColor: 'green', backgroundColor: 'transparent' }
              ]
            };
          }
        }
      }
    }
  }

  openDetailDialog(player: any): void {
    const yardsData: ChartDataSets[] = [
      { data: [0, 1, 0, 0, 0], label: 'Pass' },
      { data: [2, 1, 1, 2, 3], label: 'Rush' },
      { data: [0, 0, 1, 0, 1], label: 'Rec' }
    ];

    this.yardsChart = {
      type: 'line',
      dataset: yardsData,
      labels: ['', '', '', '', ''],
      legend: true,
      color: [
        { borderColor: 'red', backgroundColor: 'transparent' },
        { borderColor: 'blue', backgroundColor: 'transparent' },
        { borderColor: 'green', backgroundColor: 'transparent' }
      ]
    };

    const data = {
      title: `${player.name} Yards Detail`,
      chart: this.yardsChart
    };

    this.dialog.open(DetailPopUpComponent, {
      width: '50%',
      disableClose: true,
      data: { payload: data }
    });
  }
}
