
import { Injectable } from '@angular/core';

import { User } from '../user';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private currentUser: User;
  message: string;

  constructor() {
    if (!localStorage.getItem('currentUser')) {
      this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    } else {
      console.log('User Not Set');
    }
  }

  setCurrentUser(currentUser: any): void {
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