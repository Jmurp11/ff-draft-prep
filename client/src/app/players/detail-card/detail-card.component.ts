import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AuthStoreService } from 'src/app/auth/auth-store.service';
import { NoteStoreService } from 'src/app/notes/note-store.service';
import { ApolloAngularSDK, Exact, NoteInput, NotesDocument, TargetInput } from 'src/app/sdk/generated/graphql';
import { NavigateService } from 'src/app/shared/navigate.service';
import { PopUpService } from 'src/app/shared/pop-up.service';
import { CreateTargetComponent } from 'src/app/targets/create-target/create-target.component';
import { UIStoreService } from 'src/app/ui/ui-store.service';
import { PlayerStoreService } from '../player-store.service';

@Component({
  selector: 'app-detail-card',
  templateUrl: './detail-card.component.html',
  styleUrls: ['./detail-card.component.scss']
})
export class DetailCardComponent implements OnInit, OnChanges, OnDestroy {

  @Input()
  input: any;

  subSink: Subscription = new Subscription();
  freeAgent: string = 'Free Agent';
  freeAgentPrimaryColor: string = '#d1d1e0'
  freeAgentSecondaryColor: string = '#48486a';
  activeStatus: string = 'Active';
  player: any;
  status: string;

  constructor(
    private apolloSdk: ApolloAngularSDK,
    private snack: MatSnackBar,
    private authStore: AuthStoreService,
    public _navigate: NavigateService,
    public _popupService: PopUpService,
    private dialog: MatDialog,
    private noteStore: NoteStoreService,
    private uiStore: UIStoreService,
    private playerStore: PlayerStoreService
  ) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    for (const propName in changes) {
      if (changes.hasOwnProperty(propName)) {
        switch (propName) {
          case 'input': {
            this.player = this.input;

            this.status = (this.player.status !== 'Injured Reserve') ? this.player.status : 'Injured Res'
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
    this.subSink.unsubscribe()
  }
}
