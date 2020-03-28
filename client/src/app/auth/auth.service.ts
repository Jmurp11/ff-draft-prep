import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { login, register, logout, confirmUser, forgotPassword, changePassword } from './queries';
import { Apollo } from 'apollo-angular';
import { User } from './user.model';
import { Router } from '@angular/router';

export interface LoginResponse {
  success: boolean;
  user?: User;
  accessToken?: string;
  message?: string;
}

export interface AuthResponse {
  success: boolean;
  message?: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  userInStorage = JSON.parse(localStorage.getItem('user'));
  user = new BehaviorSubject<User>(null);
  loginStatus = new BehaviorSubject<LoginResponse>(null);
  registerStatus = new BehaviorSubject<AuthResponse>(null);
  confirmStatus = new BehaviorSubject<AuthResponse>(null);
  forgotStatus = new BehaviorSubject<AuthResponse>(null);
  changePassStatus = new BehaviorSubject<AuthResponse>(null);
  private tokenExpirationTimer: any;

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

        this.handleAuthentication(
          data.login.success.user.id,
          data.login.success.user.email,
          data.login.success.user.username,
          data.login.success.accessToken,
          data.login.success.expiresIn
        );

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

  async autoLogin() {
    const userData: {
      id: string;
      email: string;
      username: string;
      _token: string;
      _tokenExpiration: string;
    } = JSON.parse(localStorage.getItem('user'));

    if (!userData) {
      return;
    }

    const loadedUser = new User(
      userData.id,
      userData.email,
      userData.username,
      userData._token,
      new Date(userData._tokenExpiration)
    );

    if (loadedUser.token) {
      this.user.next(loadedUser);
      const expirationDuration =
        new Date(userData._tokenExpiration).getTime() -
        new Date().getTime();
      this.autoLogout(userData.id, expirationDuration);
    }
  }

  async register(email: string, password: string, username: string, profileImage: string) {
    this.apollo.mutate({
      mutation: register,
      variables: {
        email,
        password,
        username,
        profileImage
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

  autoLogout(userId: string, expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout(userId);
    }, expirationDuration);
  }

  handleAuthentication(
    id: string,
    email: string,
    username: string,
    token: string,
    expiresIn: number
  ) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(id, email, username, token, expirationDate);
    this.user.next(user);
    this.autoLogout(id, expiresIn * 1000);
    localStorage.setItem('user', JSON.stringify(user));
  }

  confirmUser(token: string) {
    return this.apollo.mutate({
      mutation: confirmUser,
      variables: {
        token
      }
    }).subscribe(({ data }) => {
      if (!data.confirmUser.success) {
        const response = {
          success: false,
          message: data.confirmUser.errors[0].message
        };

        this.confirmStatus.next(response);
      } else {
        const response = {
          success: true,
          message: data.confirmUser.success[0].message
        };

        this.confirmStatus.next(response);
      }
    }, (error) => {
      console.log(error);
    });
  }

  forgotPassword(email: string) {
    return this.apollo.mutate({
      mutation: forgotPassword,
      variables: {
        email
      }
    }).subscribe(({ data }) => {
      if (!data.forgotPassword.success) {
        const response = {
          success: false,
          message: data.forgotPassword.errors[0].message
        };

        this.forgotStatus.next(response);
      } else {
        const response = {
          success: true,
          message: data.forgotPassword.success[0].message
        };

        this.forgotStatus.next(response);
      }
    }, (error) => {
      console.log(error);
    });
  }

  changePassword(token: string, password: string) {
    return this.apollo.mutate({
      mutation: changePassword,
      variables: {
        token,
        password
      }
    }).subscribe(({ data }) => {
      if (!data.changePassword.success) {
        const response = {
          success: false,
          message: data.changePassword.errors[0].message
        };

        this.changePassStatus.next(response);
      } else {
        const response = {
          success: true,
          message: data.changePassword.success[0].message
        };

        this.changePassStatus.next(response);
      }
    }, (error) => {
      console.log(error);
    });
  }
/**
  setRefreshToken(token: string) {
    this.refreshToken.next(token);
  }

  async fetchRefreshToken() {
    let result: string;

    fetch('http://localhost:4000/refresh_token', {
      method: 'POST',
      credentials: 'include'
    }).then(async data => {
      const object = await data.json();
      if (!object.accessToken) {
        result = '';
        this.setRefreshToken(result);
      }
      result = object.accessToken;
      this.setRefreshToken(result);
    });
  }
*/
}
