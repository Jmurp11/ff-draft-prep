import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilteredDataService {

  data = new BehaviorSubject<any[]>(null);

  constructor() { }

  setValue(value: any[]) {
    this.sort(value);
    this.data.next(null);
    this.data.next(value);
  }

  sort(value: any[]) {
    value = value.sort((player1, player2) => {
      if (player1.averageDraftPosition && player2.averageDraftPosition) {
        return player1.averageDraftPosition - player2.averageDraftPosition;
      }
    });
  }
}
