import { Component, ViewChild, OnDestroy, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Subscription } from 'rxjs';
import { Apollo } from 'apollo-angular';
import { players } from '../queries';
import { Player } from '../player.model';
import { PlayerService } from '../player.service';
import { NoteService } from '../../../notes/note.service';
import { AuthService } from 'src/app/auth/auth.service';
import { PlayerGqlService } from '../player-gql.service';
import { UserQueryService } from 'src/app/shared/user/user-query.service';
import { Note } from 'src/app/notes/note.model';

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

  players$: Subscription;
  user$: Subscription;

  lastSelectedPlayer: Player;
  selectedPlayers: Player[];
  players: Player[];
  currentPlayer: Player;

  currentUser: string;
  add_circle: string;
  undo: string;

  loading: boolean;
  isDraft: boolean;

  notes: any;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  columnsToDisplay = [
    'draft', 'note', 'rank', 'name', 'position', 'team',
    'bye', 'completions', 'attempts', 'passYards',
    'passTd', 'interception', 'carries', 'rushYards',
    'rushTd', 'fumbles', 'receptions',
    'receivingYards', 'receivingTd', 'fantasyPoints',
    'vbd'
  ];

  expandedPlayer: Player | null;

  constructor(
    private _note: NoteService,
    private _player: PlayerService,
    private _playerQ: PlayerGqlService,
    private _user: UserQueryService
  ) { }

  ngOnInit() {
    this.loading = true;
    this.players = [];
    this.selectedPlayers = [];
    this.notes = [];

    this.user$ = this._user.me().subscribe(({ data, loading }) => {
      this.currentUser = data.me.id;

      this.players$ = this._playerQ.players(this.currentUser)
        .subscribe(({ data, loading }) => {
          this.loading = loading;

          data.players.forEach((el: any) => {
            el.selected = false;
            this.players.push(el);
          });

          // this.players.sort((a, b) => a.defaultRank.rank - b.defaultRank.rank);

          this.dataSource = new MatTableDataSource(this.players);
          this.dataSource.filterPredicate = (filteredData, filter: string) => {
            let valid = false;

            const transformedFilter = filter.trim().toLowerCase();

            Object.keys(filteredData).map(key => {
              if (
                key === 'player' &&
                (
                  filteredData.firstName.toLowerCase().includes(transformedFilter)
                  || filteredData.lastName.toLowerCase().includes(transformedFilter)
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
    });

    this._player.currentPlayer.subscribe(current => {
      this.notes = current.notes;
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
    if (this.players$) {
      this.players$.unsubscribe();
    }
    if (this.user$) {
      this.user$.unsubscribe();
    }
  }
}
