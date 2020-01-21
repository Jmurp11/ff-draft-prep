import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DraftStateService {
  isDraft: Boolean;

  constructor() { }

  updateIsDraft() {
    this.isDraft = !this.isDraft;
  }
}
