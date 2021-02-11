import { Injectable } from '@angular/core';
import { StoreState } from '../AppStore';
import { ObservableStore } from '@codewithdan/observable-store';
import { of, Observable } from 'rxjs';
import { NoteArgs } from '../sdk/generated/graphql';

@Injectable({
  providedIn: 'root'
})
export class NoteStoreService extends ObservableStore<StoreState> {

  constructor() {
    super({ trackStateHistory: true, logStateChanges: true });

    const initalState = {
      noteInput: {
        filterType: null,
        user: null,
        player: null
      }
    };
    this.setState(initalState, 'INIT_NOTE_STATE');
  }

  getNoteInput(): Observable<NoteArgs> {
    const noteInput = this.getState().noteInput;
    return of(noteInput);
  }

  updateNoteInput(value: NoteArgs) {
    const updatedState = {
      noteInput: value
    };

    this.setState(updatedState, 'UPDATE_RIGHT_NAV_STATE');
  }

}
