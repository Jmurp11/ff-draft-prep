import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { notes } from './queries';

@Injectable({
  providedIn: 'root'
})
export class NotesQueriesService {

  constructor(
    private apollo: Apollo,
  ) { }

  notes() {
    return this.apollo.watchQuery<any>({
      query: notes
    }).valueChanges;
  }
}
