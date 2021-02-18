import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { ApolloAngularSDK, NoteArgs } from '../../sdk/generated/graphql';
import { tap, switchMap } from 'rxjs/operators';
import { Chart } from '../../ui/chart/chart.model';
import { ChartDataSets } from 'chart.js';
import { NoteStoreService } from 'src/app/notes/note-store.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit, OnDestroy {

  subSink: Subscription = new Subscription();
  player: any;
  id: string;
  loading: boolean;
  ppgChart: Chart;
  yardsChart: Chart;
  tdChart: Chart;
  notesInput: NoteArgs;
  positionStatsTitle: string;
  gaugeVal: number;

  constructor(
    private apolloSdk: ApolloAngularSDK,
    private noteStore: NoteStoreService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.subSink.add(
      this.route.params
        .pipe(
          tap(({ id }) => {
            this.loading = true;
            this.id = id;
          }),
          switchMap(() => {
            return this.apolloSdk.playerWatch({
              data: {
                filterType: 'byId',
                id: parseInt(this.id, 10)
              }
            }).valueChanges
          })
        ).subscribe(({ loading, data }) => {
          this.loading = loading;
          this.player = data.player;

          this.notesInput = {
            filterType: 'byPlayer',
            player: this.player.id
          };

          this.noteStore.updateNoteInput(this.notesInput);

          switch (this.player.position) {
            case 'QB':
              this.positionStatsTitle = 'Completions %'
              this.gaugeVal = .8 * 100;
              break;
            case 'RB':
              this.positionStatsTitle = 'Touch Share'
              this.gaugeVal = .45 * 100;
              break;
            case 'WR':
              this.positionStatsTitle = 'Target Share'
              this.gaugeVal = .45 * 100;
              break;
            case 'TE':
              this.positionStatsTitle = 'Target Share'
              this.gaugeVal = .45 * 100;
              break;
          }

          const yardsData: ChartDataSets[] = [
            { data: [0, 25, 0, 0, 0], label: 'Passing' },
            { data: [100, 125, 88, 105, 150], label: 'Rushing' },
            { data: [25, 27, 50, 100, 15], label: 'Receiving' }
          ];

          const tdData: ChartDataSets[] = [
            { data: [0, 1, 0, 0, 0], label: 'Passing' },
            { data: [2, 1, 1, 2, 3], label: 'Rushing' },
            { data: [0, 0, 1, 0, 1], label: 'Receiving' }
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
        }));
  }

  ngOnDestroy() {
    this.subSink.unsubscribe();
  }
}
