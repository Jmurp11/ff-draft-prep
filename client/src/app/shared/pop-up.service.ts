import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { CreateFolderComponent } from '../notes/create-folder/create-folder.component';
import { CreateNoteComponent } from '../notes/create-note/create-note.component';
import { NoteStoreService } from '../notes/note-store.service';
import { ApolloAngularSDK, Exact, FolderArgs, FoldersDocument, NoteInput, NotesDocument, PlayerReferenceInput, TargetInput } from '../sdk/generated/graphql';
import { CreateTargetComponent } from '../targets/create-target/create-target.component';

@Injectable({
  providedIn: 'root'
})
export class PopUpService {
  subSink: Subscription = new Subscription();

  constructor(
    private apolloSdk: ApolloAngularSDK,
    private noteStore: NoteStoreService,
    private dialog: MatDialog,
    private snack: MatSnackBar
  ) { }

  openCreateNoteDialog(player: any, isNew: boolean, id: string): void {
    const data = {
      player,
      isNew,
      id
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

        const folder = res.form.folder ? res.form.folder.id : null;
        console.log(res.references);
        const note: Exact<NoteInput> = {
          id: res.id,
          title: res.form.title,
          folder,
          body: res.form.content,
          isPrivate: true
        };

        const references: Exact<PlayerReferenceInput>[] = [];

        if (res.id) {
          this.editNoteMutation(note);
        } else {
          this.createNoteMutation(note, references);
        }
      });
  }

  openCreateFolderDialog(isNew: boolean, id: string): void {
    const dialogRef: MatDialogRef<any> = this.dialog.open(CreateFolderComponent, {
      width: '50em',
      disableClose: true,
      data: {
        isNew,
        id
      }
    });

    dialogRef.afterClosed()
      .subscribe(res => {
        if (!res) {
          return;
        }

        const folder: Exact<FolderArgs> = {
          id: res.id,
          title: res.form.title
        };

        if (res.id) {
          this.editFolderMutation(folder);
        } else {
          this.createFolderMutation(folder);
        }

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

  createNoteMutation(note: Exact<NoteInput>, references: Exact<PlayerReferenceInput>[]) {
    this.subSink.add(
      this.noteStore.stateChanged
        .pipe(
          switchMap(() => this.noteStore.getNoteInput()),
          switchMap(noteArgs => {
            return this.apolloSdk.createNote({
              data: note,
              references
            }, {
              refetchQueries: [
                {
                  query: NotesDocument,
                  variables: {
                    data: noteArgs
                  }
                },
                {
                  query: NotesDocument,
                  variables: {
                    data: {
                      filterType: 'byCurrentUserAndNoFolder'
                    }
                  }
                },
                {
                  query: FoldersDocument,
                  variables: {
                    data: {
                      filterType: 'byCurrentUser'
                    }
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
    )
  }

  editNoteMutation(note: Exact<NoteInput>) {
    this.subSink.add(
      this.noteStore.stateChanged
        .pipe(
          switchMap(() => this.noteStore.getNoteInput()),
          switchMap(noteArgs => {
            return this.apolloSdk.editNote({
              data: note
            }, {
              refetchQueries: [
                {
                  query: NotesDocument,
                  variables: {
                    data: noteArgs
                  }
                },
                {
                  query: NotesDocument,
                  variables: {
                    data: {
                      filterType: 'byCurrentUserAndNoFolder'
                    }
                  }
                },
                {
                  query: FoldersDocument,
                  variables: {
                    data: {
                      filterType: 'byCurrentUser'
                    }
                  }
                }
              ]
            })
          })
        )
        .subscribe(({ data }) => {
          if (data.editNote.success) {
            this.snack.open(data.editNote.success[0].message, 'Dismiss', { duration: 5000 });
          }

          if (data.editNote.errors) {
            this.snack.open(data.editNote.errors[0].message, 'Dismiss', { duration: 5000 });
          }
        })
    )
  }

  createFolderMutation(folder: Exact<FolderArgs>) {
    this.subSink.add(
      this.apolloSdk.createFolder(
        { data: folder },
        {
          refetchQueries: [
            {
              query: FoldersDocument,
              variables: {
                data: {
                  filterType: 'byCurrentUser'
                }
              }
            }
          ]
        }
      )
        .subscribe(({ data }) => {
          if (data.createFolder.success) {
            this.snack.open(data.createFolder.success[0].message, 'Dismiss', { duration: 5000 });
          }

          if (data.createFolder.errors) {
            this.snack.open(data.createFolder.errors[0].message, 'Dismiss', { duration: 5000 });
          }
        })
    );
  }

  editFolderMutation(folder: Exact<FolderArgs>) {
    this.subSink.add(
      this.apolloSdk.editFolder(
        { data: folder },
        {
          refetchQueries: [
            {
              query: FoldersDocument,
              variables: {
                data: {
                  filterType: 'byCurrentUser'
                }
              }
            }
          ]
        }
      )
        .subscribe(({ data }) => {
          if (data.editFolder.success) {
            this.snack.open(data.editFolder.success[0].message, 'Dismiss', { duration: 5000 });
          }

          if (data.editFolder.errors) {
            this.snack.open(data.editFolder.errors[0].message, 'Dismiss', { duration: 5000 });
          }
        })
    );
  }
}
