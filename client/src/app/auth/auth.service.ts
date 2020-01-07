
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { Apollo } from 'apollo-angular';

import { User } from '../user';
import { login } from './queries';
import { userByEmail } from '../user/queries';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private currentUser: User;
  message: string;

  constructor(
    private apollo: Apollo,
  ) {
    if (!localStorage.getItem('currentUser')) {
      this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    } else {
      console.log('User Not Set');
    }
  }

  setCurrentUser(currentUser): void {
    this.currentUser = currentUser;
  }

  getCurrentUser() {
    return this.currentUser;
  }

  setMessage(message: string) {
    this.message = message;
  }

  getMessage() {
    return this.message;
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUser = null;
  }
}