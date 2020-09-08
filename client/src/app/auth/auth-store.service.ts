import { Injectable } from '@angular/core';
import { StoreState } from '../AppStore';
import { ObservableStore } from '@codewithdan/observable-store';
import { of, Observable, timer, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApolloQueryResult } from 'apollo-client';
import { Router } from '@angular/router';
import { ApolloAngularSDK, MeQuery, LoginInput, LogoutInput, MeDocument } from '../sdk/generated/graphql';
import { CookieService } from 'ngx-cookie-service';


@Injectable({
  providedIn: 'root'
})
export class AuthStoreService extends ObservableStore<StoreState> {
  private tokenExpirationTimer: any;

  constructor(
    private apolloSdk: ApolloAngularSDK,
    private cookie: CookieService,
    private router: Router
  ) {
    super({ trackStateHistory: true, logStateChanges: true });
    const initalState = {
      currentUser: null
    };
    this.setState(initalState, 'INIT_STATE');
  }

  getCurrentUser(): Observable<ApolloQueryResult<MeQuery>> {
    const currentUser = this.getState().currentUser;
    if (currentUser) {
      return of(currentUser);
    } else {
      return this.apolloSdk.meWatch()
        .valueChanges
        .pipe(
          map(res => {
            this.setState({ currentUser: res }, 'GET_CURRENT_USER');
            return res;
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
          this.handleAuthentication(res.data.login.success.user,
            {
              accessToken: res.data.login.success.accessToken,
              expiresIn: res.data.login.success.expiresIn
            });

          this.router.navigate(['/dashboard']);

          return res;
        })
      );
  }

  autoLogin(): void {
    const userData = {
      id: this.cookie.get('id'),
      email: this.cookie.get('email'),
      isAdmin: this.cookie.get('isAdmin'),
      _accessToken: this.cookie.get('accessToken'),
      _tokenExpiration: this.cookie.get('expiresIn')
    };

    if (!userData) {
      return;
    }

    const loadedUser = {
      data: {
        me: {
          id: userData.id,
          email: userData.email,
          isAdmin: userData.isAdmin,
          __typename: 'User'
        }
      }
    };

    if (userData._accessToken) {
      this.setState({ currentUser: loadedUser }, 'AUTO_LOGIN');

      const expirationDuration =
        new Date(userData._tokenExpiration).getTime() -
        new Date().getTime();

      // this.autoLogout(expirationDuration);
    }
  }

  logout(): Subscription {
    const input: LogoutInput = {
      userId: this.getState().currentUser.data.me.id
    };

    return this.apolloSdk.logout(
      { data: input },
      {
        refetchQueries: [
          {
            query: MeDocument
          }
        ]
      }
    )
      .subscribe(res => {
        this.setState({ currentUser: null }, 'LOGOUT');
        this.cookie.deleteAll();
        this.router.navigateByUrl('/landing');
      });
  }

  autoLogout(expirationDuration: number): void {
    const expired = expirationDuration * 150000000;
    const time = timer(expired);
    time.subscribe(() => this.logout());
  }

  handleAuthentication(
    userData: {
      id: string,
      email: string,
      isAdmin: string,
      __typename: 'User'
    },
    tokenData: {
      accessToken: string,
      expiresIn: number
    }): void {
    const user = {
      data: {
        me: userData
      }
    };
    this.setState({ currentUser: user }, 'LOGIN');
    this.cookie.set('id', userData.id);
    this.cookie.set('email', userData.email);
    this.cookie.set('isAdmin', userData.isAdmin);
    this.cookie.set('accessToken', tokenData.accessToken);
    this.cookie.set('expiresIn', tokenData.expiresIn.toString());

    // this.autoLogout(tokenData.expiresIn);
  }
}
