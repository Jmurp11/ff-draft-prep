import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { createTarget, deleteTarget } from './queries';
import { BehaviorSubject, Subscription } from 'rxjs';
import { meQuery } from '../shared/user/queries';

export interface TargetResponse {
  success: boolean;
  message?: string;
}

@Injectable({
  providedIn: 'root'
})
export class TargetService {
  auth$: Subscription;
  targetStatus = new BehaviorSubject<TargetResponse>(null);
  deleteStatus = new BehaviorSubject<TargetResponse>(null);
  clearTargetForm = new BehaviorSubject<boolean>(null);

  constructor(
    private apollo: Apollo
  ) { }

  createTarget(
    user: string,
    player: string,
    round: number
  ) {
    this.apollo.mutate({
      mutation: createTarget,
      variables: {
        user,
        player,
        round
      },
      refetchQueries: [
        {
          query: meQuery
        }
      ]
    }).subscribe(({ data }) => {
      if (data.createTarget.success) {
        const response = {
          success: true,
          message: data.createTarget.success[0].message
        };

        this.targetStatus.next(response);
      } else {
        const response = {
          success: false,
          message: data.createTarget.errors[0].message
        };

        this.targetStatus.next(response);
      }
    });
  }

  deleteTarget(id: string, user: string) {
    this.apollo.mutate({
      mutation: deleteTarget,
      variables: {
        id
      },
      refetchQueries: [
        {
          query: meQuery
        }
      ]
    }).subscribe(({ data }) => {
      if (data.deleteTarget.success) {
        const response = {
          success: true,
          message: data.deleteTarget.success[0].message
        };

        this.deleteStatus.next(response);
      } else {
        const response = {
          success: false,
          message: data.deleteTarget.errors[0].message
        };

        this.deleteStatus.next(response);
      }
    });
  }

  resetResponse() {
    this.targetStatus.next(null);
    this.deleteStatus.next(null);
  }

  resetForm(val: boolean) {
    this.clearTargetForm.next(val);
  }
}
