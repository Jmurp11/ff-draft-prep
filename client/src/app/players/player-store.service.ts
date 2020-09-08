import { Injectable } from '@angular/core';
import { StoreState } from '../AppStore';
import { ObservableStore } from '@codewithdan/observable-store';
import { of, Observable } from 'rxjs';

enum ScoringTypes {
  standard = 'Standard',
  half = 'Half PPR',
  full = 'Full PPR'
}

@Injectable({
  providedIn: 'root'
})
export class PlayerStoreService extends ObservableStore<StoreState> {
  scoringTypes: string[];

  constructor() {
    super({ trackStateHistory: true, logStateChanges: true });

    this.scoringTypes = [
      ScoringTypes.standard,
      ScoringTypes.half,
      ScoringTypes.full
    ];

    const initalState = {
      scoringType: this.scoringTypes[0],
      currentPlayer: null
    };
    this.setState(initalState, 'INIT_STATE');
  }

  getCurrentScoringType(): Observable<string> {
    const scoringType = this.getState().scoringType;
    return of(scoringType);
  }

  updateScoringType(value: string) {
    const updatedState = {
      scoringType: value
    };

    this.setState(updatedState, 'UPDATE_SCORING_TYPE');
  }

  getScoringTypes() {
    return this.scoringTypes;
  }

  getCurrentPlayer(): Observable<number> {
    const player = this.getState().currentPlayer;
    return of(player);
  }

  updateCurrentPlayer(value: number) {
    const updatedState = {
      currentPlayer: value
    };

    this.setState(updatedState, 'UPDATE_CURRENT_PLAYER');
  }

}
