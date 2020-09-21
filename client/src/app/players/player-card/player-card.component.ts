import { Component, OnInit, Input, SimpleChanges, OnChanges, ViewChild, OnDestroy } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { PlayerStoreService } from '../player-store.service';
import { Subscription } from 'rxjs';
import { PanelStateService } from '../panel-state.service';
import { AddTargetComponent } from '../../target/add-target/add-target.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ApolloAngularSDK, TargetInput, TargetsDocument, TargetsQuery, NoteInput, NotesDocument } from '../../sdk/generated/graphql';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthStoreService } from 'src/app/auth/auth-store.service';
import { switchMap } from 'rxjs/operators';
import { TargetsQueryService } from 'src/app/target/targets-query.service';
import { CreateNoteComponent } from 'src/app/notes/create-note/create-note.component';

enum PositionColors {
  qb = 'orange',
  rb = 'green',
  wr = 'blue',
  te = 'purple',
  k = 'teal'
}

@Component({
  selector: 'app-player-card',
  templateUrl: './player-card.component.html',
  styleUrls: ['./player-card.component.scss']
})
export class PlayerCardComponent implements OnInit, OnChanges, OnDestroy {

  @Input() dataInput: any;

  player: any;
  primaryColor: string;
  secondaryColor: string;
  age: string;
  scoringType: string;
  scoringTypes: string[];
  userTargets: any[];
  scoringTypeSub: Subscription;
  addTargetSub: Subscription;
  createNoteSub: Subscription;
  color: string;
  panel1: boolean;
  panel2: boolean;
  dataSub: Subscription;
  isTargeted: boolean;
  targetRound: number;

  @ViewChild(MatAccordion) accordion: MatAccordion;

  constructor(
    private dialog: MatDialog,
    private apolloSdk: ApolloAngularSDK,
    private authStore: AuthStoreService,
    private playerStore: PlayerStoreService,
    private panelState: PanelStateService,
    private snack: MatSnackBar,
    private targets: TargetsQueryService
  ) {
    this.userTargets = [];
  }

  ngOnInit(): void {
    this.targetRound = 0;
    this.panel1 = false;
    this.panel2 = false;
    this.isTargeted = false;
    this.scoringTypes = this.playerStore.getScoringTypes();

    this.scoringTypeSub = this.playerStore.stateChanged
      .subscribe(state => this.scoringType = state.scoringType);

    this.dataSub = this.authStore.stateChanged
      .pipe(
        switchMap(output => {
          if (output.currentUser) {
            return this.getTargets();
          }
        })
      ).subscribe(res => {
        this.userTargets = res.data.targets;
      });

  }

  filterTargets(target: any) {
    return target.player.id === this.player.id;
  }

  ngOnChanges(changes: SimpleChanges): void {
    for (const propName in changes) {
      if (changes.hasOwnProperty(propName)) {
        switch (propName) {
          case 'dataInput': {
            this.player = this.dataInput;

            this.primaryColor = `#${this.player.team.primaryColor}`;
            this.secondaryColor = `#${this.player.team.secondaryColor}`;

            switch (this.player.position) {
              case 'QB':
                this.color = PositionColors.qb;
                break;
              case 'RB':
                this.color = PositionColors.rb;
                break;
              case 'WR':
                this.color = PositionColors.wr;
                break;
              case 'TE':
                this.color = PositionColors.te;
                break;
              case 'K':
                this.color = PositionColors.k;
                break;
            }
            const date = new Date();
            const birthDate = Date.parse(this.player.birthDate);
            this.age = (Math.abs(date.getTime() - new Date(birthDate).getTime()) / 31536000000).toFixed();
            /*
                        const target = this.userTargets.filter(this.filterTargets);

                        this.isTargeted = target[0] ? true : false;

                        if (this.isTargeted) {
                          console.log(target[0].round);
                          this.targetRound = target[0].round;
                        }
            */
            break;
          }
        }
      }
    }
  }

  updatePanelState(value: boolean) {
    console.log('Sending to service: ', value);
    this.panelState.setPanelState(value);
  }

  updatePanel1State() {
    this.panel1 = !this.panel1;
    console.log('Updated Panel 1 State on Panel 1 Click: ', this.panel1);
    console.log('Updated Panel 2 State on Panel 1 Click: ', this.panel2);
    if (!this.panel1 && !this.panel2) {
      this.updatePanelState(false);
    } else {
      this.updatePanelState(true);
    }
  }

  updatePanel2State() {
    this.panel2 = !this.panel2;
    console.log('Updated Panel 1 State on Panel 2 Click: ', this.panel1);
    console.log('Updated Panel 2 State on Panel 2 Click: ', this.panel2);
    if (!this.panel1 && !this.panel2) {
      this.updatePanelState(false);
    } else {
      this.updatePanelState(true);
    }
  }

  setCurrentPlayer() {
    return this.playerStore.updateCurrentPlayer(this.player.id);
  }

  getTargets() {
    return this.targets.getTargets();
  }

  openAddTargetDialog(player: any) {
    const data = {
      player
    };

    const dialogRef: MatDialogRef<any> = this.dialog.open(AddTargetComponent, {
      width: '40em',
      disableClose: true,
      data: { payload: data }
    });

    dialogRef.afterClosed()
      .subscribe(res => {
        if (!res) {
          return;
        }

        const input: TargetInput = {
          round: res.round,
          player: res.player.id
        };

        this.addTargetSub = this.apolloSdk.createTarget(
          {
            data: input
          },
          {
            refetchQueries: [
              {
                query: TargetsDocument,
                variables: {
                  data: {
                    filterType: 'byCurrentUser'
                  }
                }
              }
            ]
          }
        )
          .subscribe(val => {
            this.snack.open(val.data.createTarget.success[0].message, 'Dismiss', { duration: 4000 });
          });
      });
  }

  openCreateNoteDialog(player: any) {
    const data = {
      player
    };

    const dialogRef: MatDialogRef<any> = this.dialog.open(CreateNoteComponent, {
      width: '40em',
      height: '25em',
      disableClose: true,
      data: { payload: data }
    });

    dialogRef.afterClosed()
      .subscribe(res => {
        if (!res) {
          return;
        }

        const input: NoteInput = {
          player: res.player.id,
          title: res.title,
          body: res.body,
          isPrivate: res.isPrivate
        };

        this.createNoteSub = this.apolloSdk.createNote(
          {
            data: input
          },
          {
            refetchQueries: [
              {
                query: NotesDocument,
                variables: {
                  data: {
                    filterType: null
                  }
                }
              }
            ]
          }
        )
          .subscribe(val => {
            this.snack.open(val.data.createNote.success[0].message, 'Dismiss', { duration: 4000 });
          });
      });
  }

  ngOnDestroy() {
    this.scoringTypeSub.unsubscribe();
    if (this.addTargetSub) {
      this.addTargetSub.unsubscribe();
    }
    if (this.createNoteSub) {
      this.createNoteSub.unsubscribe();
    }
    this.dataSub.unsubscribe();
  }

}
