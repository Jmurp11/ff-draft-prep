import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { meQuery, user, users, updateUser } from './queries';
import { userNotes, notes, publicNotes } from '../../notes/queries';
import { BehaviorSubject } from 'rxjs';

export interface UpdateResponse {
  success: boolean;
  message?: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserQueryService {

  updateUserStatus = new BehaviorSubject<UpdateResponse>(null);

  constructor(private apollo: Apollo) { }

  user(username: string) {
    return this.apollo.watchQuery<any>({
      query: user,
      variables: {
        username
      }
    }).valueChanges;
  }

  users() {
    return this.apollo.watchQuery<any>({
      query: users
    }).valueChanges;
  }

  me() {
    return this.apollo.watchQuery<any>({
      query: meQuery
    }).valueChanges;
  }

  updateUserProfileImage(id: string, image: string) {
    this.apollo.mutate({
      mutation: updateUser,
      variables: {
        id,
        image
      },
      refetchQueries: [
        {
          query: userNotes,
          variables: {
            user: id
          }
        },
        {
          query: notes,
          variables: {
            user: id
          }
        },
        {
          query: publicNotes,
        }
      ]
    }).subscribe(({ data }) => {
      console.log(data);
      if (!data.updateUserProfileImage.success) {
        const response = {
          success: false,
          message: data.updateUserProfileImage.errors[0].message
        };

        this.updateUserStatus.next(response);
      } else {
        const response = {
          success: true,
          message: data.updateUserProfileImage.success[0].message
        };

        this.updateUserStatus.next(response);
      }
    });
  }
}
