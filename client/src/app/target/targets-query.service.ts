import { Injectable } from '@angular/core';
import { ApolloAngularSDK } from '../sdk/generated/graphql';

@Injectable({
  providedIn: 'root'
})
export class TargetsQueryService {

  constructor(
    private apolloSdk: ApolloAngularSDK
  ) { }

  getTargets() {
    return this.apolloSdk.targetsWatch({
      data: {
        filterType: 'byCurrentUser'
      }
    })
      .valueChanges;
  }
}
