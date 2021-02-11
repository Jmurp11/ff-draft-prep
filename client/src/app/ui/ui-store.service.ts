import { Injectable } from '@angular/core';
import { StoreState } from '../AppStore';
import { ObservableStore } from '@codewithdan/observable-store';
import { of, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UIStoreService extends ObservableStore<StoreState> {

  constructor() {
    super({ trackStateHistory: true, logStateChanges: true });

    const initalState = {
      rightNavState: false
    };
    this.setState(initalState, 'INIT_UI_STATE');
  }

  getRightNavState(): Observable<boolean> {
    const rightNavState = this.getState().rightNavState;
    return of(rightNavState);
  }

  updateRightNavState(value: boolean) {
    const updatedState = {
      rightNavState: value
    };

    this.setState(updatedState, 'UPDATE_RIGHT_NAV_STATE');
  }

}
