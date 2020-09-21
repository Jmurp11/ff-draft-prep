import { Injectable } from '@angular/core';
import { StoreState } from '../AppStore';
import { ObservableStore } from '@codewithdan/observable-store';
import { of, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavStoreService extends ObservableStore<StoreState> {

  constructor() {
    super({ trackStateHistory: true, logStateChanges: true });

    const initalState = {
      currentRoute: null
    };
    this.setState(initalState, 'INIT_STATE');
  }

  getCurrentRoute(): Observable<string> {
    const route = this.getState().currentRoute;
    return of(route);
  }

  updateCurrentRoute(value: string) {
    const updatedState = {
      currentRoute: value
    };

    this.setState(updatedState, 'UPDATE_CURRENT_ROUTE');
  }

}
