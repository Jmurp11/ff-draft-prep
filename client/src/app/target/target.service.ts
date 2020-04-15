import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { createTarget, deleteTarget, targetByPlayerUser } from './queries';
import { BehaviorSubject, Subscription } from 'rxjs';
import { meQuery } from '../shared/user/queries';
import { avgTargetRound } from '../draft/player/queries';

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
        },
        {
          query: targetByPlayerUser,
          variables: {
            user,
            player
          }
        },
        {
          query: avgTargetRound,
          variables: {
            player
          }
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

  deleteTarget(id: string, user: string, player: string) {
    this.apollo.mutate({
      mutation: deleteTarget,
      variables: {
        id
      },
      refetchQueries: [
        {
          query: meQuery
        },
        {
          query: targetByPlayerUser,
          variables: {
            user,
            player
          }
        },
        {
          query: avgTargetRound,
          variables: {
            player
          }
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

  targetByPlayerUser(user: string, player: string) {
    return this.apollo.watchQuery<any>({
      query: targetByPlayerUser,
      variables: {
        player,
        user
      }
    }).valueChanges;
  }

  resetResponse() {
    this.targetStatus.next(null);
    this.deleteStatus.next(null);
  }

  resetForm(val: boolean) {
    this.clearTargetForm.next(val);
  }
}
