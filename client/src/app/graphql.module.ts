import { NgModule } from '@angular/core';
import { ApolloModule, APOLLO_OPTIONS, Apollo } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloLink } from 'apollo-link';
import { setContext } from 'apollo-link-context';
import { AuthService } from './auth/auth.service';

// const uri = 'https://draftshark-api.herokuapp.com/'; UAT
const uri = 'http://127.0.0.1:4000/graphql'; // DEV
// const uri = 'http://localhost:3000'; DOCKER

@NgModule({
  exports: [ApolloModule, HttpLinkModule]
})
export class GraphQLModule {
  constructor(
    private apollo: Apollo,
    private httpLink: HttpLink,
    private _auth: AuthService
  ) {
    let token: string;

    this._auth.user.subscribe(user => {
      if (user) {
        token = user.token;
      } else {
        token = '';
      }
    });

    const basic = setContext((operation, context) => ({
      headers: {
        Accept: 'charset=utf-8'
      }
    }));

    const auth = setContext((operation, context) => ({
      headers: {
        Authorization: `Bearer ${token}`
      },
    }));

    const link = ApolloLink.from([basic, auth, this.httpLink.create({ uri })]);
    const cache = new InMemoryCache();

    this.apollo.create({ link, cache });
  }

  setUp() {}
}
