import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-team-info',
  templateUrl: './team-info.component.html',
  styleUrls: ['./team-info.component.scss']
})
export class TeamInfoComponent implements OnInit, OnChanges {

  @Input()
  dataInput: any;

  data: any[];
  displayedColumns: string[];
  year: number;

  constructor() {
    this.data = [];
    this.displayedColumns = [
      'rank',
      'passRank',
      'rushRank',
      'plays',
      'yardsPerPlay',
      'turnovers',
      'passAttempts',
      'rushAttempt',
      'scorePercentage',
      'turnoverPercentage',
      'offensiveLineRank',
      'runningBackSoS'
    ];

    this.year = new Date().getFullYear() - 1;
  }

  ngOnInit(): void { }

  ngOnChanges(changes: SimpleChanges): void {
    for (const propName in changes) {
      if (changes.hasOwnProperty(propName)) {
        switch (propName) {
          case 'dataInput': {
            this.data = [this.dataInput.stats];

            break;
          }
        }
      }
    }
  }
}
