import { NgModule } from '@angular/core';
import { ApolloModule, Apollo } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloLink } from 'apollo-link';
import { setContext } from 'apollo-link-context';
import { AuthStoreService } from './auth/auth-store.service';
import { CookieService } from 'ngx-cookie-service';

// const uri = 'https://draftshark-api.herokuapp.com/'; UAT
const uri = 'http://127.0.0.1:4000/graphql'; // DEV
// const uri = 'http://localhost:3000'; DOCKER

@NgModule({
  exports: [ApolloModule, HttpLinkModule]
})
export class GraphQLModule {
  token: string;

  constructor(
    private apollo: Apollo,
    private authStore: AuthStoreService,
    private cookie: CookieService,
    private httpLink: HttpLink
  ) {

    this.authStore.stateChanged
      .subscribe(user => {
        if (user) {
          this.token = this.cookie.get('accessToken');
        } else {
          this.token = '';
        }
      });

    const basic = setContext((operation, context) => ({
      headers: {
        Accept: `'charset=utf-8'`
      }
    }));

    const auth = setContext((operation, context) => ({
      headers: {
        Authorization: `Bearer ${this.token}`
      }
    }));

    const link = ApolloLink.from([
      basic,
      auth,
      this.httpLink.create({
        uri,
        withCredentials: true
      })
    ]);

    const cache = new InMemoryCache();

    this.apollo.create({ link, cache });
  }

  setUp() { }
}
