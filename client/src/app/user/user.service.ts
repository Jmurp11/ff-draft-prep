import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Subscription } from 'rxjs';

import { User } from './';
import { userByEmail } from './queries';

@Injectable({
  providedIn: 'root'
})

// GET RID OF THIS AND MOVE IT DIRECTLY TO WHERE ITS CALLED
export class UserService {
  user: Subscription;
  querySubscription: Subscription;
  loading: boolean;

  constructor(
    private apollo: Apollo
  ) { }

  getUserByEmail(email: string) {
    this.querySubscription = this.apollo.watchQuery<any>({
      query: userByEmail(email)
    })
      .valueChanges
      .subscribe(({ data, loading }) => {
        this.loading = loading;
        this.user = data.userByEmail;
      });
  }
}
