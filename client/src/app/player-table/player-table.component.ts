import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { animate, state, style, transition, trigger } from '@angular/animations';

export interface PlayerData {
  playerName: string;
  team: string;
  position: string;
  imageUrl: string;
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
  receptions: number;
  receivingYards: number;
  receivingTd: number;
  fantasyPoints: number;
  teamRank: number;
  teamPassRank: number;
  teamRushRank: number;
  pointsFor: number;
  yards: number;
  plays: number;
  yardsPerPlay: number;
  turnovers: number;
  passAttempts: number;
  passCompletions: number;
  passYardsTeam: number;
  passTdTeam: number;
  interceptionTeam: number;
  netYardsPerPass: number;
  rushAttemptTeam: number;
  rushYardsTeam: number;
  rushTdTeam: number;
  yardsPerRush: number;
  scorePercentage: number;
  turnoverPercentage: number;
  offensiveLineRank: number;
  runningBackSoS: number;
}

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

export class PlayerTableComponent implements OnInit {
  dataSource: MatTableDataSource<PlayerData>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  columnsToDisplay = ['rank', 'playerName', 'position', 'team', 'tier', 'completions', 'attempts',
    'passYards', 'passTd', 'interception', 'carries', 'rushYards', 'rushTd', 'fumbles', 'receptions',
    'receivingYards', 'receivingTd', 'fantasyPoints'];
  expandedPlayer: PlayerData | null;


  constructor() {
    this.dataSource = new MatTableDataSource(PLAYER_DATA);
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

const PLAYER_DATA: PlayerData[] = [
  {
    playerName: 'Leveon Bell',
    team: 'NYJ',
    position: 'RB',
    imageUrl: 'http://content.sportslogos.net/logos/7/152/thumbs/15291162019.gif',
    rank: 1,
    tier: 2,
    bye: 11,
    completions: 0,
    attempts: 0,
    passYards: 0,
    passTd: 0,
    interception: 0,
    carries: 0,
    rushYards: 0,
    rushTd: 0,
    fumbles: 0,
    fantasyPoints: 0,
    receptions: 0,
    receivingYards: 0,
    receivingTd: 0,
    pointsFor: 100,
    teamRank: 1,
    teamPassRank: 1,
    teamRushRank: 1,
    yards: 100,
    plays: 100,
    yardsPerPlay: 100.0,
    turnovers: 100,
    passAttempts: 0,
    passCompletions: 0,
    passYardsTeam: 100,
    passTdTeam: 100,
    interceptionTeam: 100,
    netYardsPerPass: 10.0,
    rushAttemptTeam: 100,
    rushYardsTeam: 100,
    rushTdTeam: 100,
    yardsPerRush: 100,
    scorePercentage: 85.0,
    turnoverPercentage: 5.0,
    offensiveLineRank: 2.5,
    runningBackSoS: 1
  }, {
    playerName: 'Todd Gurley',
    team: 'LAR',
    position: 'RB',
    imageUrl: 'http://content.sportslogos.net/logos/7/5941/thumbs/594179532017.gif',
    rank: 2,
    tier: 2,
    bye: 11,
    completions: 0,
    attempts: 0,
    passYards: 0,
    passTd: 0,
    interception: 0,
    carries: 0,
    rushYards: 0,
    rushTd: 0,
    fumbles: 0,
    fantasyPoints: 0,
    receptions: 0,
    receivingYards: 0,
    receivingTd: 0,
    pointsFor: 0,
    teamRank: 1,
    teamPassRank: 1,
    teamRushRank: 1,
    yards: 0,
    plays: 0,
    yardsPerPlay: 0.0,
    turnovers: 0,
    passAttempts: 0,
    passCompletions: 0,
    passYardsTeam: 100,
    passTdTeam: 100,
    interceptionTeam: 100,
    netYardsPerPass: 10.0,
    rushAttemptTeam: 100,
    rushYardsTeam: 100,
    rushTdTeam: 100,
    yardsPerRush: 100,
    scorePercentage: 85.0,
    turnoverPercentage: 5.0,
    offensiveLineRank: 2.5,
    runningBackSoS: 1
  }, {
    playerName: 'Mike Davis',
    team: 'CHI',
    position: 'RB',
    imageUrl: 'http://content.sportslogos.net/logos/7/169/thumbs/364.gif',
    rank: 3,
    tier: 2,
    bye: 11,
    completions: 0,
    attempts: 0,
    passYards: 0,
    passTd: 0,
    interception: 0,
    carries: 0,
    rushYards: 0,
    rushTd: 0,
    fumbles: 0,
    fantasyPoints: 0,
    receptions: 0,
    receivingYards: 0,
    receivingTd: 0,
    pointsFor: 0,
    teamRank: 1,
    teamPassRank: 1,
    teamRushRank: 1,
    yards: 0,
    plays: 0,
    yardsPerPlay: 0.0,
    turnovers: 0,
    passAttempts: 0,
    passCompletions: 0,
    passYardsTeam: 100,
    passTdTeam: 100,
    interceptionTeam: 100,
    netYardsPerPass: 10.0,
    rushAttemptTeam: 100,
    rushYardsTeam: 100,
    rushTdTeam: 100,
    yardsPerRush: 100,
    scorePercentage: 85.0,
    turnoverPercentage: 5.0,
    offensiveLineRank: 2.5,
    runningBackSoS: 1
  }, {
    playerName: 'Patrick Mahomes',
    team: 'KC',
    position: 'QB',
    imageUrl: 'http://content.sportslogos.net/logos/7/162/thumbs/857.gif',
    rank: 4,
    tier: 2,
    bye: 11,
    completions: 0,
    attempts: 0,
    passYards: 0,
    passTd: 0,
    interception: 0,
    carries: 0,
    rushYards: 0,
    rushTd: 0,
    fumbles: 0,
    fantasyPoints: 0,
    receptions: 0,
    receivingYards: 0,
    receivingTd: 0,
    pointsFor: 0,
    teamRank: 1,
    teamPassRank: 1,
    teamRushRank: 1,
    yards: 0,
    plays: 0,
    yardsPerPlay: 0.0,
    turnovers: 0,
    passAttempts: 0,
    passCompletions: 0,
    passYardsTeam: 0,
    passTdTeam: 0,
    interceptionTeam: 0,
    netYardsPerPass: 0.0,
    rushAttemptTeam: 0,
    rushYardsTeam: 0,
    rushTdTeam: 0,
    yardsPerRush: 0,
    scorePercentage: 0.0,
    turnoverPercentage: 0.0,
    offensiveLineRank: 2.5,
    runningBackSoS: 1
  }, {
    playerName: 'Mike Evans',
    team: 'TB',
    position: 'WR',
    imageUrl: 'http://content.sportslogos.net/logos/7/176/thumbs/17636702014.gif',
    rank: 5,
    tier: 2,
    bye: 11,
    completions: 0,
    attempts: 0,
    passYards: 0,
    passTd: 0,
    interception: 0,
    carries: 0,
    rushYards: 0,
    rushTd: 0,
    fumbles: 0,
    fantasyPoints: 0,
    receptions: 0,
    receivingYards: 0,
    receivingTd: 0,
    pointsFor: 0,
    teamRank: 1,
    teamPassRank: 1,
    teamRushRank: 1,
    yards: 0,
    plays: 0,
    yardsPerPlay: 0.0,
    turnovers: 0,
    passAttempts: 0,
    passCompletions: 0,
    passYardsTeam: 0,
    passTdTeam: 0,
    interceptionTeam: 0,
    netYardsPerPass: 0.0,
    rushAttemptTeam: 0,
    rushYardsTeam: 0,
    rushTdTeam: 0,
    yardsPerRush: 0,
    scorePercentage: 0.0,
    turnoverPercentage: 0.0,
    offensiveLineRank: 2.5,
    runningBackSoS: 1
  }
];
