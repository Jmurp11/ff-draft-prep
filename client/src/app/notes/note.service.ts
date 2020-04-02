import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { createNote, userNotes, notes, deleteNote, addLike, createShare, likedNotes } from './queries';
import { BehaviorSubject } from 'rxjs';

export interface NoteResponse {
  success: boolean;
  message?: string;
}

@Injectable({
  providedIn: 'root'
})
export class NoteService {
  noteStatus = new BehaviorSubject<NoteResponse>(null);
  deleteStatus = new BehaviorSubject<NoteResponse>(null);
  likeStatus = new BehaviorSubject<NoteResponse>(null);
  shareStatus = new BehaviorSubject<NoteResponse>(null);
  hasNotes = new BehaviorSubject<boolean>(null);
  clearNoteForm = new BehaviorSubject<boolean>(null);
  populatePlayer = new BehaviorSubject<boolean>(true);

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
      refetchQueries: [
        {
          query: user,
          variables: {
            user
          }
        },
        {
          query: notes
        }
      ]
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

  deleteNote(id: string, user: string) {
    this.apollo.mutate({
      mutation: deleteNote,
      variables: {
        id
      },
      refetchQueries: [
        {
          query: userNotes,
          variables: {
            user
          }
        },
        {
          query: notes
        }
      ]
    }).subscribe(({ data }) => {
      if (!data.deleteNote.success) {
        const response = {
          success: false,
          message: data.deleteNote.errors[0].message
        };

        this.noteStatus.next(response);
      } else {
        const response = {
          success: true,
          message: data.deleteNote.success[0].message
        };

        this.noteStatus.next(response);
      }
    });
  }

  addLike(user: string, note: string) {
    this.apollo.mutate({
      mutation: addLike,
      variables: {
        user,
        note
      },
      refetchQueries: [
        {
          query: likedNotes,
          variables: {
            userId: user
          }
        }
      ]
    }).subscribe(({ data }) => {
      if (!data.addLike.success) {
        const response = {
          success: false,
          message: data.addLike.errors[0].message
        };

        this.likeStatus.next(response);
      } else {
        const response = {
          success: true,
          message: data.addLike.success[0].message
        };

        this.likeStatus.next(response);
      }
    });
  }

  createShare(user: string, note: string) {
    this.apollo.mutate({
      mutation: createShare,
      variables: {
        user,
        note
      }
    }).subscribe(({ data }) => {
      if (!data.createShare.success) {
        const response = {
          success: false,
          message: data.createShare.errors[0].message
        };

        this.shareStatus.next(response);
      } else {
        const response = {
          success: true,
          message: data.createShare.success[0].message
        };

        this.shareStatus.next(response);
      }
    });
  }

  setHasNotes(hasNotes: boolean) {
    this.hasNotes.next(hasNotes);
  }

  prepopulatePlayer(val: boolean) {
    this.populatePlayer.next(val);
  }

  resetForm(val: boolean) {
    this.clearNoteForm.next(val);
  }

  resetResponse() {
    this.noteStatus.next(null);
    this.deleteStatus.next(null);
    this.likeStatus.next(null);
    this.shareStatus.next(null);
  }
}
