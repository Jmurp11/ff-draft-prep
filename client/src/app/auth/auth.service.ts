
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Apollo } from 'apollo-angular';

import { User, UserService } from '../user';
import { login } from './queries';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  private messageSubject: BehaviorSubject<string>;
  public message: Observable<string>;
  loading: boolean;
  loginResult: any;

  constructor(
    private apollo: Apollo,
    private userService: UserService
  ) {
    let user: User;
    let mess: string;
    if (!localStorage.getItem('currentUser')) {
      user = JSON.parse(localStorage.getItem('currentUser'));
    } else {
      console.log('Not Defined Yet');
    }
    this.currentUserSubject = new BehaviorSubject<User>(user);
    this.currentUser = this.currentUserSubject.asObservable();

    this.messageSubject = new BehaviorSubject<string>(mess);
    this.message = this.messageSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(email: string, password: string) {
    let user: User;

    return this.apollo.mutate({
      mutation: login,
      variables: {
        email,
        password
      }
    }).subscribe(({ data }) => {
      if (data.login === null) {
        user = this.userService.getUserByEmail(email);
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
        return user;
      } else {
        this.messageSubject.next(data.login[0].message);
      }
    }, (error) => {
      console.log(error);
    });
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}
