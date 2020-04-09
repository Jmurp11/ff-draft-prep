import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  currentUser = new BehaviorSubject<User>(null);

  constructor() { }

  setUser(user: any) {
    this.currentUser.next(user);
  }
}
