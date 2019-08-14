import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {animate, state, style, transition, trigger} from '@angular/animations';

export interface PlayerData {
  playerName: string;
  team: string;
  position: string;
  rank: number,
  tier: number,
  bye: number;
  completions: number;
  attempts: number;
  passYards: number;
  passTd: number;
  interception: number;
  carries: number;
  rushYards: number;
  rushTd: number;
  fumbles: number;
  targets: number;
  receptions: number;
  receivingYards: number;
  receivingTd: number;
}

/** Constants used to fill up our data base. */
const TEAMS: string[] = [
  'maroon', 'red', 'orange', 'yellow', 'olive', 'green', 'purple', 'fuchsia', 'lime', 'teal',
  'aqua', 'blue', 'navy', 'black', 'gray'
];
const NAMES: string[] = [
  'Maia', 'Asher', 'Olivia', 'Atticus', 'Amelia', 'Jack', 'Charlotte', 'Theodore', 'Isla', 'Oliver',
  'Isabella', 'Jasper', 'Cora', 'Levi', 'Violet', 'Arthur', 'Mia', 'Thomas', 'Elizabeth'
];

const POSITIONS: string[] = [
  'QB', 'RB', 'WR', 'TE'
];

@Component({
  selector: 'app-player-table',
  templateUrl: './player-table.component.html',
  styleUrls: ['./player-table.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

export class PlayerTableComponent implements OnInit {

  displayedColumns: string[] = [
    'rank',
    'playerName',
    'position',
    'tier',
    'team',
    'bye',
    'passAC',
    'passYards',
    'passTd',
    'interception',
    'carries',
    'rushYards',
    'rushTd',
    'fumbles',
    'targets',
    'receptions',
    'receivingYards',
    'receivingTd',
  ];
  dataSource: MatTableDataSource<PlayerData>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor() {
    // Create 100 users
    const users = Array.from({ length: 100 }, (_, k) => createPlayer(k + 1));

    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(users);
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}

/** Builds and returns a new User. */
function createPlayer(id: number): PlayerData {
  const name = NAMES[Math.round(Math.random() * (NAMES.length - 1))] + ' ' +
    NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) + '.';

  return {
    playerName: name,
    team: TEAMS[Math.round(Math.random() * (TEAMS.length - 1))],
    position: POSITIONS[Math.round(Math.random() * (POSITIONS.length - 1))],
    completions: 0,
    attempts: 0,
    passYards: 0,
    passTd: 0,
    interception: 0,
    carries: 0,
    rushYards: 0,
    rushTd: 0,
    fumbles: 0,
    receptions: 0,
    targets: 0,
    receivingTd: 0,
    receivingYards: 0,
    rank: Math.round(Math.random() * 500),
    tier: Math.round(Math.random() * 11),
    bye: Math.round(Math.random() * 16),
  };
}
