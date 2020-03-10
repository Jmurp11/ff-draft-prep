import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { login, register, logout } from './queries';
import { Apollo } from 'apollo-angular';
import { User } from './user.model';
import { Router } from '@angular/router';

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

  user = new BehaviorSubject<User>(null);
  loginStatus = new BehaviorSubject<LoginResponse>(null);
  registerStatus = new BehaviorSubject<RegisterResponse>(null);

  constructor(
    private apollo: Apollo,
    private router: Router
  ) { }

  login(email: string, password: string) {
    this.apollo.mutate({
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
          data.login.success.accessToken
        );

        this.user.next(user);

        localStorage.setItem('user', JSON.stringify(user));

        this.loginStatus.next(response);
      } else {
        const response: LoginResponse = {
          success: false,
          message: data.login.errors[0].message
        };

        this.loginStatus.next(response);
      }
    }, (error) => {
      console.log(error);
    });
  }

  autoLogin() {
    const userData: {
      id: string;
      email: string;
      username: string;
      _token: string;
    } = JSON.parse(localStorage.getItem('user'));

    if (!userData) {
      return;
    }

    const loadedUser = new User(
      userData.id,
      userData.email,
      userData.username,
      userData._token
    );

    if (loadedUser.token) {
      this.user.next(loadedUser);
    }
  }

  async register(email: string, password: string, username: string) {
    this.apollo.mutate({
      mutation: register,
      variables: {
        email,
        password,
        username
      }
    }).subscribe(({ data }) => {
      if (!data.register.success) {
        const response = {
          success: false,
          message: data.register.errors[0].message
        };

        this.registerStatus.next(response);
      } else {
        const response = {
          success: true,
          message: data.register.success[0].message
        };

        this.registerStatus.next(response);
      }
    }, (error) => {
      console.log(error);
    });
  }

  logout(userId: string) {
    return this.apollo.mutate({
      mutation: logout,
      variables: {
        userId
      }
    }).subscribe(({ data }) => {
      this.router.navigate(['home']);
      this.apollo.getClient().resetStore();
      this.user.next(null);
      this.loginStatus.next(null);
      localStorage.removeItem('user');
      return data;
    }, (error) => {
      console.log(error);
    });
  }
}
