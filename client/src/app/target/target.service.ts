import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { createTarget, deleteTarget, targets } from './queries';
import { BehaviorSubject, Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';


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
    private _auth: AuthService,
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

  deleteTarget(id: string) {
    let user = '';

    this.auth$ = this._auth.user.subscribe(data => {
      user = data.id;
    });

    this.apollo.mutate({
      mutation: deleteTarget,
      variables: {
        id
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

  resetForm(val: boolean) {
    this.clearTargetForm.next(val);
  }

}