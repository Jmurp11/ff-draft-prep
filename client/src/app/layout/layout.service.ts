import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {

  isSearchActive = new BehaviorSubject(null);

  constructor() { }

  setIsSearchActive(isActive: boolean) {
    return this.isSearchActive.next(isActive);
  }
}
