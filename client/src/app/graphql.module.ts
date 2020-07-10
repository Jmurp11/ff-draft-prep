import { NgModule } from '@angular/core';
import { ApolloModule, APOLLO_OPTIONS, Apollo } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloLink } from 'apollo-link';
import { setContext } from 'apollo-link-context';
import { Store } from '@ngrx/store';
import * as fromApp from './store/app.reducer';

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
    private store: Store<fromApp.AppState>
  ) {
    let token: string;

    this.store.select('auth')
      .subscribe(data => {
        if (data.user) {
          token = data.user.token;
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
}
