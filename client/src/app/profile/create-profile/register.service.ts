import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
// import { User } from 'src/app/user';
import { register } from './queries';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  public message: string;

  constructor(
    private apollo: Apollo,
    private router: Router) { }

  register(email: string, password: string, username: string) {
    return this.apollo.mutate({
      mutation: register,
      variables: {
        email,
        password,
        username
      }
    }).subscribe(({ data }) => {
      this.router.navigate(['./login']);
      return data;
    }, (error) => {
      console.log(error);
    });
  }
}
