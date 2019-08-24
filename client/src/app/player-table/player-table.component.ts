import { Component, ViewChild, OnDestroy, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Subscription } from 'rxjs';
import { Apollo } from 'apollo-angular';

import { projections } from './queries';
import { Player } from './Player';

@Component({
  selector: 'app-player-table',
  templateUrl: './player-table.component.html',
  styleUrls: ['./player-table.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

export class PlayerTableComponent implements OnInit, OnDestroy {
  dataSource: MatTableDataSource<Player>;
  players: Player[];
  loading: boolean;
  querySubscription: Subscription;
  lastSelectedPlayer: Player;
  selectedPlayers: Player[];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  columnsToDisplay = ['draft', 'player.rank', 'player.lastName', 'player.position', 'player.team.abbreviation',
    'player.tier', 'player.team.bye', 'completions', 'attempts', 'passYards', 'passTd', 'interception', 'carries', 'rushYards',
    'rushTd', 'fumbles', 'receptions', 'receivingYards', 'receivingTd', 'fantasyPoints'];

  expandedPlayer: Player | null;

  constructor(
    private apollo: Apollo
  ) { }

  ngOnInit() {
    this.players = [];
    this.selectedPlayers = [];
    this.querySubscription = this.apollo.watchQuery<any>({
      query: projections
    })
      .valueChanges
      .subscribe(({ data, loading }) => {
        this.loading = loading;
        data.projections.forEach(el => {
          el.selected = false;
          this.players.push(el);
        });
        this.dataSource = new MatTableDataSource(this.players);
        this.dataSource.filterPredicate = (data, filter: string) => {
          let valid = false;

          const transformedFilter = filter.trim().toLowerCase();

          Object.keys(data).map(key => {
            if (
              key === 'player' &&
              (
                data.player.firstName.toLowerCase().includes(transformedFilter)
                || data.player.lastName.toLowerCase().includes(transformedFilter)
              )
            ) {
              valid = true;
            } else {
              if (('' + data[key]).toLowerCase().includes(transformedFilter)) {
                valid = true;
              }
            }
          });

          return valid;
        };
        this.dataSource.sortingDataAccessor = this.sortingDataAccessor;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  sortingDataAccessor(item, property) {
    if (property.includes('.')) {
      return property.split('.')
        .reduce((object, key) => object[key], item);
    }
    return item[property];
  }

  toggleRow(player: Player) {
    player.selected = !player.selected;
    this.lastSelectedPlayer = player;
    this.selectedPlayers.push(this.lastSelectedPlayer);
  }

  undoLastSelection() {
    this.lastSelectedPlayer.selected = !this.lastSelectedPlayer.selected;
  }

  resetAll() {
    this.selectedPlayers.forEach(player => {
      player.selected = !player.selected;
    });
  }

  ngOnDestroy() {
    this.querySubscription.unsubscribe();
  }
}
