import { Component, Input, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { TableConfig } from '../../ui/generic-table/generic-table-config.model';
import { ApolloAngularSDK, Exact, NoteInput, NotesDocument, Player, TargetInput } from '../../sdk/generated/graphql';
import { CreateNoteComponent } from '../../notes/create-note/create-note.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CreateTargetComponent } from '../../targets/create-target/create-target.component';
import { Subscription } from 'rxjs';
import { PlayerStoreService } from '../player-store.service';
import { UIStoreService } from '../../ui/ui-store.service';
import { NoteStoreService } from '../../notes/note-store.service';
import { AuthStoreService } from '../../auth/auth-store.service';
import { Chart } from '../../ui/chart/chart.model';
import { switchMap } from 'rxjs/operators';
import { NavigateService } from '../../shared/navigate.service';
import { PopUpService } from 'src/app/shared/pop-up.service';

@Component({
  selector: 'app-player-card',
  templateUrl: './player-card.component.html',
  styleUrls: ['./player-card.component.scss']
})
export class PlayerCardComponent implements OnInit, OnDestroy {

  @Input()
  input: Player;

  subSink: Subscription;
  player: Player;
  freeAgent: string = 'Free Agent';
  freeAgentPrimaryColor: string = '#d1d1e0'
  freeAgentSecondaryColor: string = '#48486a';
  activeStatus: string = 'Active';
  passingTableConfig: TableConfig;
  receivingTableConfig: TableConfig;
  rushingTableConfig: TableConfig;
  kickingTableConfig: TableConfig;
  chartInput: Chart;
  additionalInfo: any;

  constructor(
    private apolloSdk: ApolloAngularSDK,
    private dialog: MatDialog,
    public _navigate: NavigateService,
    public _popupService: PopUpService,
    private noteStore: NoteStoreService,
    private playerStore: PlayerStoreService,
    private snack: MatSnackBar,
    private authStore: AuthStoreService,
    private uiStore: UIStoreService
  ) { }

  ngOnInit(): void {
    this.subSink = new Subscription();
  }

  ngOnChanges(changes: SimpleChanges) {
    for (const propName in changes) {
      if (changes.hasOwnProperty(propName)) {
        switch (propName) {
          case 'input': {
            this.player = this.input;

            const passingPoints = parseFloat((((this.player.projection?.passYards / 25) + (this.player.projection?.passTd * 4)) - (this.player.projection?.interception * 2)).toFixed(2));
            const rushingPoints = parseFloat((((this.player.projection?.rushYards / 10) + (this.player.projection?.rushTd * 6)) - (this.player.projection?.fumbles * 2)).toFixed(2));
            const receivingPoints = parseFloat((((this.player.projection?.receivingYards / 10) + (this.player.projection?.receivingTd * 6))).toFixed(2));

            this.additionalInfo = {
              sum: passingPoints + rushingPoints + receivingPoints
            };

            this.chartInput = {
              type: 'doughnut',
              dataset: [{ data: [passingPoints, rushingPoints, receivingPoints] }],
              labels: ['Pass Points', 'Rush Points', 'Rec Points'],
              legend: true,
              color: null
            };

            break;
          }
        }
      }
    }
  }

  setCurrentPlayer() {
    this.playerStore.updateCurrentPlayer(this.player.id);
  }

  setNoteQueryInput(player: number) {
    this.subSink.add(
      this.authStore.stateChanged
        .pipe(
          switchMap(() => this.authStore.getCurrentUser()),
        )
        .subscribe(res => {
          const noteInput = {
            filterType: 'byUserAndPlayer',
            user: res.id,
            player
          };

          this.noteStore.updateNoteInput(noteInput);
        }
        )
    );
  }

  getAge(birthdate: string) {
    const birthday = new Date(birthdate);

    const today = new Date();

    let age = (today.getTime() - birthday.getTime()) / 1000;

    age /= (60 * 60 * 24);

    return Math.abs(Math.round(age / 365.25));
  }

  openCreateTargetDialog(player: any): void {
    const data = {
      player
    };

    const dialogRef: MatDialogRef<any> = this.dialog.open(CreateTargetComponent, {
      width: '50em',
      disableClose: true,
      data: { payload: data }
    });

    dialogRef.afterClosed()
      .subscribe(res => {
        if (!res) {
          return;
        }

        const target: Exact<TargetInput> = {
          player: res.player.id,
          round: res.round
        };

        this.subSink.add(
          this.apolloSdk.createTarget({
            data: target
          })
            .subscribe(({ data }) => {
              if (data.createTarget.success) {
                this.snack.open(data.createTarget.success[0].message, 'Dismiss', { duration: 5000 });
              }

              if (data.createTarget.errors) {
                this.snack.open(data.createTarget.errors[0].message, 'Dismiss', { duration: 5000 });
              }
            })
        );
      });
  }

  openNoteList(player: number) {
    this.setCurrentPlayer();
    this.setNoteQueryInput(player);
    this.uiStore.updateRightNavState(true);
  }

  ngOnDestroy() {
    this.subSink.unsubscribe();
  }
}
