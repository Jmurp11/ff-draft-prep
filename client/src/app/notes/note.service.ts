import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { createNote } from './queries';

export interface CreateNoteResponse {
  success: boolean;
  message?: string;
}

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  constructor(
    private apollo: Apollo
  ) { }

  createNote(
    user: string, player: number, title: string, body: string,
    source: string, isPrivate: boolean): CreateNoteResponse {
    let response: CreateNoteResponse;

    this.apollo.mutate({
      mutation: createNote,
      variables: {
        user,
        player,
        title,
        body,
        source,
        isPrivate
      }
    }).subscribe(({ data }) => {
      if (data.addNote.success) {
        response = {
          success: true,
          message: data.createNote.success[0].message
        };
      } else {
        response = {
          success: false,
          message: data.createNote.errors[0].message
        };
      }
    });

    return response;
  }
}
