import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Filter } from './filter.model';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  filterValue = new BehaviorSubject<Filter[]>(null);
  viewType = new BehaviorSubject<boolean>(true);
  isTable = new BehaviorSubject<boolean>(false);

  constructor() { }

  setFilterValue(value: Filter) {
    const currFilterValue = this.filterValue.value;
    if (currFilterValue) {
      this.filterValue.value.push(value);
    } else {
      this.filterValue.next([value]);
    }
    this.filterValue.next([...this.filterValue.value]);
  }

  removeTypedFilter() {
    if (this.filterValue.getValue() === null) {
      return;
    }
    const currFilters = this.filterValue.getValue().slice();
    const newFilters = [];
    currFilters.forEach((filter) => {
      if (filter.id !== -1) {
        newFilters.push(filter);
      }
    });
    this.filterValue.next(newFilters);
  }

  removeFilter(filter: Filter) {
    const index = this.filterValue.getValue().indexOf(filter);
    const newFilters = this.filterValue.value.slice();
    newFilters.splice(index, 1);
    this.filterValue.next(newFilters);
  }
}
