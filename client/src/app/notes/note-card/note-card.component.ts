import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ApolloAngularSDK, DeleteNoteInput, NotesDocument } from 'src/app/sdk/generated/graphql';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthStoreService } from 'src/app/auth/auth-store.service';

@Component({
  selector: 'app-note-card',
  templateUrl: './note-card.component.html',
  styleUrls: ['./note-card.component.scss']
})
export class NoteCardComponent implements OnInit, OnChanges {

  @Input()
  dataInput: any;

  data: any;
  size: number;
  isAuthor: boolean;

  constructor(
    private authStore: AuthStoreService,
    private apolloSdk: ApolloAngularSDK,
    private snack: MatSnackBar
  ) {
    this.size = 30;
    this.isAuthor = false;
  }

  ngOnInit(): void { }

  ngOnChanges(changes: SimpleChanges): void {
    for (const propName in changes) {
      if (changes.hasOwnProperty(propName)) {
        switch (propName) {
          case 'dataInput': {
            this.data = this.dataInput;

            this.authStore.stateChanged
              .subscribe(state => {
                if (state.currentUser) {
                  if (this.data.user.id === state.currentUser.id) {
                    this.isAuthor = true;
                    this.size = 25;
                  }
                }
              });

            break;
          }
        }
      }
    }
  }

  deleteNote(id: string) {
    const input: DeleteNoteInput = {
      id
    };

    return this.apolloSdk.deleteNote(
      { data: input },
      {
        refetchQueries: [
          {
            query: NotesDocument,
            variables: {
              data: {
                filterType: 'byCurrentUser'
              }
            }
          },
          {
            query: NotesDocument,
            variables: {
              data: {
                filterType: null
              }
            }
          },
          {
            query: NotesDocument,
            variables: {
              data: {
                filterType: 'byPlayer'
              }
            }
          }
        ]
      }).subscribe(res => this.snack.open(res.data.deleteNote.success[0].message, 'Dismiss', { duration: 4000 }));
  }
}
