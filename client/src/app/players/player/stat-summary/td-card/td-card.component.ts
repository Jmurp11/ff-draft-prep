import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ChartDataSets } from 'chart.js';
import { Chart } from '../../../../ui/chart/chart.model';
import { DetailPopUpComponent } from '../detail-pop-up/detail-pop-up.component';

@Component({
  selector: 'app-td-card',
  templateUrl: './td-card.component.html',
  styleUrls: ['./td-card.component.scss']
})
export class TdCardComponent implements OnInit, OnChanges {

  @Input()
  playerInput: any;

  player: any;
  tdChart: Chart;

  constructor(private dialog: MatDialog) { }

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

  openDetailDialog(player: any): void {
    const tdData: ChartDataSets[] = [
      { data: [0, 1, 0, 0, 0], label: 'Pass' },
      { data: [2, 1, 1, 2, 3], label: 'Rush' },
      { data: [0, 0, 1, 0, 1], label: 'Rec' }
    ];

    this.tdChart = {
      type: 'line',
      dataset: tdData,
      labels: ['', '', '', '', ''],
      legend: true,
      color: [
        { borderColor: 'red', backgroundColor: 'transparent' },
        { borderColor: 'blue', backgroundColor: 'transparent' },
        { borderColor: 'green', backgroundColor: 'transparent' }
      ]
    };

    const data = {
      title: `${player.name} Touchdown Detail`,
      chart: this.tdChart
    };

    this.dialog.open(DetailPopUpComponent, {
      width: '50%',
      disableClose: true,
      data: { payload: data }
    });
  }
}
