import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { createNote, notes, userNotes, publicNotes } from './queries';
import { BehaviorSubject } from 'rxjs';

export interface CreateNoteResponse {
  success: boolean;
  message?: string;
}

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  noteStatus = new BehaviorSubject<CreateNoteResponse>(null);

  constructor(
    private apollo: Apollo
  ) { }

  createNote(
    user: string, player: number, title: string, body: string,
    source: string, isPrivate: boolean) {
    this.apollo.mutate({
      mutation: createNote,
      variables: {
        user,
        player,
        title,
        body,
        source,
        isPrivate
      },
      refetchQueries: [{
        query: userNotes,
        variables: {
          user
        }
      }]
    }).subscribe(({ data }) => {
      if (!data.createNote.success) {
        const response = {
          success: false,
          message: data.createNote.errors[0].message
        };

        this.noteStatus.next(response);
      } else {
        const response = {
          success: true,
          message: data.createNote.success[0].message
        };

        this.noteStatus.next(response);
      }
    });
  }
}
