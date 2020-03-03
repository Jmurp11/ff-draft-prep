import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { login } from './queries';
import { Apollo } from 'apollo-angular';
import { User } from './user.model';

export interface LoginResponse {
  success: boolean;
  user?: User;
  accessToken?: string;
  message?: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {

  user = new Subject<User>();
  loginStatus = new Subject<LoginResponse>();

  constructor(
    private apollo: Apollo
  ) { }

  login(email: string, password: string) {
    return this.apollo.mutate({
      mutation: login,
      variables: {
        email,
        password
      }
    }).subscribe(({ data }) => {
      if (data.login.success) {
        const response: LoginResponse = {
          success: true,
          user: data.login.success.user,
          accessToken: data.login.success.accessToken
        };

        const user = new User(
          data.login.success.user.id,
          data.login.success.user.email,
          data.login.success.user.username,
          data.login.success.user.accessToken
        );

        this.user.next(user);

        this.loginStatus.next(response);
      } else {
        const response: LoginResponse = {
          success: true,
          message: data.login.errors[0].message
        };

        this.loginStatus.next(response);
      }
    }, (error) => {
      console.log(error);
    });
  }
}
