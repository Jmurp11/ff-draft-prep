
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { Apollo } from 'apollo-angular';

import { User } from '../user';
import { login } from './queries';
import { userByEmail } from '../user/queries';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  private messageSubject: BehaviorSubject<string>;
  public message: Observable<string>;
  loading: boolean;
  loginResult: any;
  querySubscription: Subscription;

  constructor(
    private apollo: Apollo,
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

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}

// TODO: rewrite auth.service and auth.guard to account for query moving to component.
