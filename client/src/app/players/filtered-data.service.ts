import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilteredDataService {

  data = new BehaviorSubject<any[]>(null);

  constructor() { }

  setValue(value: any[]) {
    this.data.next(null);
    this.data.next(value);
  }
}
