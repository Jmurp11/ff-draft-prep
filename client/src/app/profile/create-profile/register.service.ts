import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
// import { User } from 'src/app/user';
import { register } from './queries';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  public message: string;

  constructor(private apollo: Apollo) { }

  register(email: string, password: string, username: string) {
    console.log('hit register service');
    return this.apollo.mutate({
      mutation: register,
      variables: {
        email,
        password,
        username
      }
    }).subscribe(({ data }) => {
      console.log(JSON.stringify(data));
      return data;
    }, (error) => {
      console.log(error);
    });
  }
}
