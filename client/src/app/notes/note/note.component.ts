import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Exact, DeleteNoteInput, ApolloAngularSDK, NotesDocument } from '../../sdk/generated/graphql';
import { NoteStoreService } from '../note-store.service';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss']
})
export class NoteComponent implements OnInit {

  @Input()
  noteInput: any;

  note: any;
  backgroundImage: string;
  subSink: Subscription = new Subscription();

  constructor(
    private apolloSdk: ApolloAngularSDK,
    private noteStore: NoteStoreService,
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
}
