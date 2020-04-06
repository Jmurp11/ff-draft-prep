import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Note } from './note.model';

export interface NoteResponse {
  success: boolean;
  message?: string;
}

@Injectable({
  providedIn: 'root'
})
export class NoteService {
  noteStatus = new BehaviorSubject<NoteResponse>(null);
  deleteStatus = new BehaviorSubject<NoteResponse>(null);
  likeStatus = new BehaviorSubject<NoteResponse>(null);
  shareStatus = new BehaviorSubject<NoteResponse>(null);
  clearNoteForm = new BehaviorSubject<boolean>(null);
  populatePlayer = new BehaviorSubject<boolean>(true);

  constructor() { }

  setNoteStatus(response: NoteResponse) {
    this.noteStatus.next(response);
  }

  setDeleteStatus(response: NoteResponse) {
    this.noteStatus.next(response);
  }

  setLikeStatus(response: NoteResponse) {
    this.noteStatus.next(response);
  }

  setShareStatus(response: NoteResponse) {
    this.noteStatus.next(response);
  }

  prepopulatePlayer(val: boolean) {
    this.populatePlayer.next(val);
  }

  resetForm(val: boolean) {
    this.clearNoteForm.next(val);
  }

  resetResponse() {
    this.noteStatus.next(null);
    this.deleteStatus.next(null);
    this.likeStatus.next(null);
    this.shareStatus.next(null);
  }
}
