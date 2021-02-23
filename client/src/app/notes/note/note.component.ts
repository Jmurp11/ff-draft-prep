import { Component, Input, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { NavigateService } from 'src/app/shared/navigate.service';
import { UIStoreService } from 'src/app/ui/ui-store.service';
import { Exact, DeleteNoteInput, ApolloAngularSDK, NotesDocument } from '../../sdk/generated/graphql';
import { NoteStoreService } from '../note-store.service';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss']
})
export class NoteComponent implements OnInit, OnDestroy {

  @Input()
  noteInput: any;

  note: any;
  backgroundImage: string;
  subSink: Subscription = new Subscription();

  constructor(
    private apolloSdk: ApolloAngularSDK,
    private noteStore: NoteStoreService,
    private _navigate: NavigateService,
    private uiStore: UIStoreService,
    private snack: MatSnackBar,) { }

  ngOnInit(): void { }

  ngOnChanges(changes: SimpleChanges) {
    for (const propName in changes) {
      if (changes.hasOwnProperty(propName)) {
        switch (propName) {
          case 'noteInput': {
            this.note = this.noteInput;
            this.backgroundImage = `url('${this.note.user.profileImage}')`;
            break;
          }
        }
      }
    }
  }

  deleteNote(note: string) {
    const input: Exact<DeleteNoteInput> = {
      id: note
    };

    this.subSink.add(
      this.noteStore.stateChanged
        .pipe(
          switchMap(() => this.noteStore.getNoteInput()),
          switchMap(noteArgs => {
            return this.apolloSdk.deleteNote({
              data: input
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
          if (data.deleteNote.success) {
            this.snack.open(data.deleteNote.success[0].message, 'Dismiss', { duration: 5000 });
          }

          if (data.deleteNote.errors) {
            this.snack.open(data.deleteNote.errors[0].message, 'Dismiss', { duration: 5000 });
          }
        })
    );
  }

  navigate(player: number) {
    this._navigate.navigate(`/players/${player}`);
    this.uiStore.updateRightNavState(false);
  }

  ngOnDestroy() {
    this.subSink.unsubscribe();
  }
}
