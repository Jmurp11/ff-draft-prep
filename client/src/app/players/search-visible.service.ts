import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchVisibleService {

  isSearchVisible = new BehaviorSubject<boolean>(true);

  constructor() { }

  toggleValue() {
    this.isSearchVisible.next(!this.isSearchVisible.value);
  }
}
