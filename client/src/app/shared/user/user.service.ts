import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { meQuery, user } from './queries';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private apollo: Apollo) { }

  user(username: string) {
    return this.apollo.watchQuery<any>({
      query: user,
      variables: {
        username
      }
    }).valueChanges;
  }

  me() {
    return this.apollo.watchQuery<any>({
      query: meQuery
    }).valueChanges;
  }
}
