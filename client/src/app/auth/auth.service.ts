import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { login, register } from './queries';
import { Apollo } from 'apollo-angular';
import { User } from './user.model';

export interface LoginResponse {
  success: boolean;
  user?: User;
  accessToken?: string;
  message?: string;
}

export interface RegisterResponse {
  success: boolean;
  message?: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {

  user = new ReplaySubject<User>();
  loginStatus = new ReplaySubject<LoginResponse>();

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

  async register(email: string, password: string, username: string) {
    let response: RegisterResponse;

    this.apollo.mutate({
      mutation: register,
      variables: {
        email,
        password,
        username
      }
    }).subscribe(({ data }) => {
      if (!data.register.success) {
        response = {
          success: false,
          message: data.register.errors[0].message
        };
      } else {
        response = {
          success: true,
          message: data.register.success[0].message
        };
      }
    }, (error) => {
      console.log(error);
    });

    return response;
  }
}
