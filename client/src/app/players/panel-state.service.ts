import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PanelStateService {

  panelState = new BehaviorSubject(false);

  constructor() { }

  setPanelState(value: boolean) {
    this.panelState.next(value);
  }
}
