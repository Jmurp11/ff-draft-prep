import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { meQuery, user, users } from './queries';

@Injectable({
  providedIn: 'root'
})
export class UserQueryService {

  constructor(private apollo: Apollo) { }

  user(username: string) {
    return this.apollo.watchQuery<any>({
      query: user,
      variables: {
        username
      }
    }).valueChanges;
  }

  users() {
    return this.apollo.watchQuery<any>({
      query: users
    }).valueChanges;
  }

  me() {
    return this.apollo.watchQuery<any>({
      query: meQuery
    }).valueChanges;
  }
}
