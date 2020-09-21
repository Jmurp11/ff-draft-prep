import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-projection-table',
  templateUrl: './projection-table.component.html',
  styleUrls: ['./projection-table.component.scss']
})
export class ProjectionTableComponent implements OnInit, OnChanges {
  @Input()
  dataInput: any;
  data: any[];
  displayedColumns: string[];

  constructor() {
    this.data = [];
  }

  ngOnInit(): void {

    this.displayedColumns = [
      'completions',
      'attempts',
      'completionPercentage',
      'passTd',
      'passYards',
      'yardsPerAttempt',
      'interception',
      'carries',
      'rushYards',
      'yardsPerCarry',
      'rushTd',
      'fumbles',
      'receptions',
      'receivingYards',
      'yardsPerReception',
      'receivingTd'
    ];
  }

  ngOnChanges(changes: SimpleChanges): void {
    for (const propName in changes) {
      if (changes.hasOwnProperty(propName)) {
        switch (propName) {
          case 'dataInput': {
            this.data = [this.dataInput];
            break;
          }
        }
      }
    }
  }
}
