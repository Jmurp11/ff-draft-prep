import { OnChanges, SimpleChanges } from '@angular/core';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AuthStoreService } from '../../../auth/auth-store.service';
import { CreateNoteComponent } from '../../../notes/create-note/create-note.component';
import { NoteStoreService } from '../../../notes/note-store.service';
import { ApolloAngularSDK, Exact, NoteInput, NotesDocument, TargetInput } from '../../../sdk/generated/graphql';
import { NavigateService } from '../../../shared/navigate.service';
import { CreateTargetComponent } from '../../../targets/create-target/create-target.component';
import { UIStoreService } from '../../../ui/ui-store.service';
import { PlayerStoreService } from '../../player-store.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnChanges {

  @Input()
  playerInput: any;

  subSink: Subscription = new Subscription();
  player: any;
  freeAgent: string = 'Free Agent';
  freeAgentPrimaryColor: string = '#d1d1e0'
  freeAgentSecondaryColor: string = '#48486a';
  activeStatus: string = 'Active';

  constructor(
    private apolloSdk: ApolloAngularSDK,
    private dialog: MatDialog,
    public _navigate: NavigateService,
    private noteStore: NoteStoreService,
    private playerStore: PlayerStoreService,
    private snack: MatSnackBar,
    private authStore: AuthStoreService,
    private uiStore: UIStoreService,
  ) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    for (const propName in changes) {
      if (changes.hasOwnProperty(propName)) {
        switch (propName) {
          case 'playerInput': {
            this.player = this.playerInput;

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

  openCreateNoteDialog(player: any): void {
    const data = {
      player
    };

    const dialogRef: MatDialogRef<any> = this.dialog.open(CreateNoteComponent, {
      width: '50em',
      disableClose: true,
      data: { payload: data }
    });

    dialogRef.afterClosed()
      .subscribe(res => {
        if (!res) {
          return;
        }

        const folder = res.folder ? res.folder.id : null;

        const note: Exact<NoteInput> = {
          player: res.player.id,
          title: res.title,
          folder,
          body: res.content,
          isPrivate: true
        };

        this.subSink.add(
          this.noteStore.stateChanged
            .pipe(
              switchMap(() => this.noteStore.getNoteInput()),
              switchMap(noteArgs => {
                return this.apolloSdk.createNote({
                  data: note
                }, {
                  refetchQueries: [
                    {
                      query: NotesDocument,
                      variables: {
                        data: noteArgs
                      }
                    }
                  ]
                })
              })
            )
            .subscribe(({ data }) => {
              if (data.createNote.success) {
                this.snack.open(data.createNote.success[0].message, 'Dismiss', { duration: 5000 });
              }

              if (data.createNote.errors) {
                this.snack.open(data.createNote.errors[0].message, 'Dismiss', { duration: 5000 });
              }
            })
        );
      });
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
}
