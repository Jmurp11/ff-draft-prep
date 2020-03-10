import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { createTarget, deleteTarget, targets } from './queries';
import { BehaviorSubject, Subscription } from 'rxjs';


export interface TargetResponse {
  success: boolean;
  message?: string;
}

@Injectable({
  providedIn: 'root'
})
export class TargetService {

  targetStatus = new BehaviorSubject<TargetResponse>(null);
  deleteStatus = new BehaviorSubject<TargetResponse>(null);
  clearTargetForm = new BehaviorSubject<boolean>(null);

  constructor(
    private apollo: Apollo
  ) { }

  createTarget(
    user: string,
    player: number,
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
          query: targets,
          variables: {
            user
          }
        }
      ]
    }).subscribe(({ data }) => {
      if (!data.createTarget.success) {
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

  deleteTarget(user: string) {
    this.apollo.mutate({
      mutation: deleteTarget,
      variables: {
        user
      },
      refetchQueries: [
        {
          query: targets,
          variables: {
            user
          }
        }
      ]
    }).subscribe(({ data }) => {
      if (!data.deleteTarget.success) {
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

  resetForm(val: boolean) {
    this.clearTargetForm.next(val);
  }

}
