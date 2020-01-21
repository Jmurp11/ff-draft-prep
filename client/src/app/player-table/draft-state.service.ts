import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DraftStateService {
  isDraft = new BehaviorSubject<Boolean>(false);

  constructor() { }

  setInitialState() {
    this.isDraft.next(false);
  }

  updateIsDraft() {
    this.isDraft.next(!this.isDraft.getValue())
  }
}
