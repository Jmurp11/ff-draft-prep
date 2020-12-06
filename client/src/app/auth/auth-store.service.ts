import { Injectable } from '@angular/core';
import { StoreState } from '../AppStore';
import { ObservableStore } from '@codewithdan/observable-store';
import { of, Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ApolloAngularSDK, LoginInput, MeDocument } from '../sdk/generated/graphql';
import { User } from '../shared/user';


@Injectable({
  providedIn: 'root'
})
export class AuthStoreService extends ObservableStore<StoreState> {
  private tokenExpirationTimer: any;

  constructor(
    private apolloSdk: ApolloAngularSDK,
    private router: Router
  ) {
    super({ trackStateHistory: true, logStateChanges: true });
    const initalState = {
      currentUser: null
    };
    this.setState(initalState, 'INIT_STATE');
  }

  getCurrentUser(): Observable<User> {
    const currentUser = this.getState().currentUser;
    if (currentUser) {
      return of(currentUser);
    } else {
      return this.apolloSdk.meWatch()
        .valueChanges
        .pipe(
          map(res => {
            const user: User = res.data.me;
            this.setState({ currentUser: user }, 'GET_CURRENT_USER');
            return user;
          })
        );
    }
  }

  login(email: string, password: string): any {
    const input: LoginInput = {
      email,
      password
    };

    return this.apolloSdk.login({ data: input })
      .pipe(
        map((res: any) => {
          this.setState({ currentUser: res.user }, 'LOGIN');
          this.router.navigate(['/dashboard']);
          return res;
        })
      );
  }


  logout(): Subscription {
    return this.apolloSdk.logout(
      {},
      {
        refetchQueries: [
          {
            query: MeDocument
          }
        ]
      }
    )
      .subscribe(() => {
        this.setState({ currentUser: null }, 'LOGOUT');
        this.router.navigateByUrl('/landing');
      });
  }
}
