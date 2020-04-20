import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { likes, note, notes, players, publicNotes, notesByPlayer, notesByPlayerUser, userNotes, noteCount, userLikesCount, userGeneratedLikesCount } from './queries';

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

  userNotes(user: string, isCurrentUser: boolean) {
    return this.apollo.watchQuery<any>({
      query: userNotes,
      variables: {
        user,
        isCurrentUser
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

  noteCount(user: string) {
    return this.apollo.watchQuery<any>({
      query: noteCount,
      variables: {
        user
      }
    }).valueChanges;
  }

  userLikesCount(user: string) {
    return this.apollo.watchQuery<any>({
      query: userLikesCount,
      variables: {
        user
      }
    }).valueChanges;
  }

  userGeneratedLikesCount(user: string) {
    return this.apollo.watchQuery<any>({
      query: userGeneratedLikesCount,
      variables: {
        user
      }
    }).valueChanges;
  }


  publicNotes() {
    return this.apollo.watchQuery<any>({
      query: publicNotes
    }).valueChanges;
  }

  players() {
    return this.apollo.watchQuery<any>({
      query: players
    })
      .valueChanges;
  }
}
