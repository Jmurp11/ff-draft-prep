import { Component, OnInit, Input, OnDestroy, SimpleChanges, OnChanges } from '@angular/core';
import { Player } from '../../player.model';
import { PlayerGqlService } from '../../player-gql.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-team-stats',
  templateUrl: './team-stats.component.html',
  styleUrls: ['./team-stats.component.css']
})
export class TeamStatsComponent implements OnInit, OnChanges, OnDestroy {
  displayColumns = [
    'depthChartPos', 'name', 'rank'
  ];

  @Input()
  playerInput: Player;

  player$: Subscription;
  curPlayer: Player;
  depthChart: any[];
  loading: boolean;

  constructor(
    private _playerQ: PlayerGqlService,
    private router: Router
  ) { }

  ngOnInit() {
    this.depthChart = [];
  }

  ngOnChanges(changes: SimpleChanges) {
    for (const propName in changes) {
      if (changes.hasOwnProperty(propName)) {
        switch (propName) {
          case 'playerInput': {
            this.curPlayer = this.playerInput;

            this.player$ = this._playerQ.depthChart(this.curPlayer.team.id, this.curPlayer.position)
              .subscribe(({ data, loading }) => {
                this.loading = loading;
                this.depthChart = data.depthChart;
              });
            break;
          }
        }
      }
    }
  }

  navigateToPlayer(player: string) {
    this.router.navigate([`./d/player/${player}`]);
  }

  ngOnDestroy() {
    if (this.player$) {
      this.player$.unsubscribe();
    }
  }
}
