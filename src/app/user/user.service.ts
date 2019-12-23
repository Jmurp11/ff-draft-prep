import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Subscription } from 'rxjs';

import { User } from './';
import { userByEmail } from './queries';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  querySubscription: Subscription;
  loading: boolean;

  constructor(
    private apollo: Apollo
  ) { }

  getUserByEmail(email: string) {
    let user: User;
    this.querySubscription = this.apollo.watchQuery<any>({
      query: userByEmail(email)
    })
      .valueChanges
      .subscribe(({ data, loading }) => {
        this.loading = loading;
        user = data.userByEmail;
      });

    return user;
  }
}
