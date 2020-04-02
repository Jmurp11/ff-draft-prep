import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';

@Injectable({
  providedIn: 'root'
})
export class PlayerGqlService {

  constructor(private apollo: Apollo) { }
}
