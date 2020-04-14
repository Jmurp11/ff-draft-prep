import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { likes, note, notes, publicNotes, notesByPlayer, notesByPlayerUser } from './queries';

@Injectable({
  providedIn: 'root'
})
export class NotesQueriesService {

  constructor(
    private apollo: Apollo,
  ) { }

  likes(user: string) {
    return this.apollo.watchQuery<any>({
      query: likes,
      variables: {
        user
      }
    }).valueChanges;
  }

  notes(user: string) {
    return this.apollo.watchQuery<any>({
      query: notes,
      variables: {
        user
      }
    }).valueChanges;
  }

  notesByPlayer(player: string) {
    return this.apollo.watchQuery<any>({
      query: notesByPlayer,
      variables: {
        player
      }
    }).valueChanges;
  }

  notesByPlayerUser(player: string, user: string) {
    return this.apollo.watchQuery<any>({
      query: notesByPlayerUser,
      variables: {
        player,
        user
      }
    }).valueChanges;
  }

  note(id: string) {
    return this.apollo.watchQuery<any>({
      query: note,
      variables: {
        id
      }
    }).valueChanges;
  }

  publicNotes() {
    return this.apollo.watchQuery<any>({
      query: publicNotes
    }).valueChanges;
  }
}
