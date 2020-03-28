import { Component, ViewChild, OnDestroy, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Subscription } from 'rxjs';
import { Apollo } from 'apollo-angular';
import { projections } from './queries';
import { Player } from './player.model';
import { PlayerService } from './player.service';
import { NoteService } from '../../notes/note.service';

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
  query$: Subscription;
  lastSelectedPlayer: Player;
  selectedPlayers: Player[];
  isDraft: boolean;
  add_circle: string;
  undo: string;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  columnsToDisplay = ['draft', 'note', 'player.rank', 'player.adp', 'player.lastName', 'player.position', 'player.team.abbreviation',
    'player.tier', 'player.team.bye', 'completions', 'attempts', 'passYards', 'passTd', 'interception', 'carries', 'rushYards',
    'rushTd', 'fumbles', 'receptions', 'receivingYards', 'receivingTd', 'fantasyPoints'];

  expandedPlayer: Player | null;

  constructor(
    private apollo: Apollo,
    private _note: NoteService,
    private _player: PlayerService
  ) { }

  ngOnInit() {
    this.loading = true;
    this.players = [];
    this.selectedPlayers = [];

    this.query$ = this.apollo.watchQuery<any>({
      query: projections
    })
      .valueChanges
      .subscribe(({ data, loading }) => {
        this.loading = loading;
        data.projections.forEach((el: any) => {
          el.selected = false;
          this.players.push(el);
        });
        this.dataSource = new MatTableDataSource(this.players);
        this.dataSource.filterPredicate = (filteredData, filter: string) => {
          let valid = false;

          const transformedFilter = filter.trim().toLowerCase();

          Object.keys(filteredData).map(key => {
            if (
              key === 'player' &&
              (
                filteredData.player.firstName.toLowerCase().includes(transformedFilter)
                || filteredData.player.lastName.toLowerCase().includes(transformedFilter)
              )
            ) {
              valid = true;
            } else {
              if (('' + filteredData[key]).toLowerCase().includes(transformedFilter)) {
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

  sortingDataAccessor(item: any, property: any) {
    if (property.includes('.')) {
      return property.split('.')
        .reduce((object: any, key: any) => object[key], item);
    }
    return item[property];
  }

  toggleRow(player: Player) {
    player.selected = !player.selected;
    this.lastSelectedPlayer = player;
    this.selectedPlayers.push(this.lastSelectedPlayer);
  }

  updateCurrentPlayer(player: Player) {
    return this._player.updateCurrentPlayer(player);
  }

  addNoteClick() {
    this._note.prepopulatePlayer(true);
  }

  onRowClick(player: Player) {
    this.updateCurrentPlayer(player);
  }

  onRowDoubleClick(player: Player) {
    this.expandedPlayer = this.expandedPlayer === player ? null : player;
  }

  resetAll() {
    this.selectedPlayers.forEach(player => {
      player.selected = false;
    });
  }

  clearNote() {
    this._note.resetForm(true);
  }

  ngOnDestroy() {
    if (this.query$) {
      this.query$.unsubscribe();
    }
  }
}
