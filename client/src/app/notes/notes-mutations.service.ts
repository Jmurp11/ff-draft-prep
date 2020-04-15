import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { addLike, createNote, createShare, deleteNote, notes, likes, publicNotes, notesByPlayer, notesByPlayerUser } from './queries';
import { NoteService } from './note.service';

@Injectable({
  providedIn: 'root'
})
export class NotesMutationsService {

  constructor(
    private apollo: Apollo,
    private _note: NoteService
  ) { }

  createNote(
    user: string, player: string, title: string, body: string,
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
          query: notes,
          variables: {
            user
          }
        },
        {
          query: publicNotes
        },
        ,
        {
          query: notesByPlayer,
          variables: {
            player
          }
        },
        ,
        {
          query: notesByPlayerUser,
          variables: {
            player,
            user
          }
        }
      ]
    }).subscribe(({ data }) => {
      if (!data.createNote.success) {
        const response = {
          success: false,
          message: data.createNote.errors[0].message
        };

        this._note.setNoteStatus(response);
      } else {
        const response = {
          success: true,
          message: data.createNote.success[0].message
        };

        this._note.setNoteStatus(response);
      }
    });
  }

  deleteNote(id: string, user: string) {
    this.apollo.mutate({
      mutation: deleteNote,
      variables: {
        id,
        user
      },
      refetchQueries: [
        {
          query: notes,
          variables: {
            user
          }
        },
        {
          query: publicNotes
        }
      ]
    }).subscribe(({ data }) => {
      if (!data.deleteNote.success) {
        const response = {
          success: false,
          message: data.deleteNote.errors[0].message
        };

        this._note.setDeleteStatus(response);
      } else {
        const response = {
          success: true,
          message: data.deleteNote.success[0].message
        };

        this._note.setDeleteStatus(response);
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
          query: likes,
          variables: {
            user
          }
        }
      ]
    }).subscribe(({ data }) => {
      if (!data.addLike.success) {
        const response = {
          success: false,
          message: data.addLike.errors[0].message
        };

        this._note.setLikeStatus(response);
      } else {
        const response = {
          success: true,
          message: data.addLike.success[0].message
        };

        this._note.setLikeStatus(response);
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

        this._note.setShareStatus(response);
      } else {
        const response = {
          success: true,
          message: data.createShare.success[0].message
        };

        this._note.setShareStatus(response);
      }
    });
  }
}
