import { Injectable } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { StoreState } from '../AppStore';
import { ObservableStore } from '@codewithdan/observable-store';
import { of, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavStoreService extends ObservableStore<StoreState> {

  constructor(
    router: Router
  ) {
    super({ trackStateHistory: true, logStateChanges: true });

    const initalState = {
      currentRoute: router.url
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
