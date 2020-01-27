import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { Apollo } from 'apollo-angular';
import { AuthService } from './auth.service';
import { User } from '../user';
import { userByEmail } from '../user/queries';
import { login } from './queries';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  form: FormGroup;
  emailControlIsValid = true;
  passwordControlIsValid = true;
  loading = false;
  errMessage: string;
  public currentUser: Observable<User>;
  public message: Observable<string>;
  subLoading: boolean;
  loginResult: any;
  querySubscription: Subscription;

  constructor(
    private router: Router,
    private authService: AuthService,
    private apollo: Apollo,
    private snackbar: MatSnackBar
  ) {
    if (this.authService.getCurrentUser()) {
      this.router.navigate(['/dashboard']);
    }
  }

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required, Validators.email]
      }),
      password: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required, Validators.minLength(6)]
      })
    });

    this.form.get('email').statusChanges.subscribe(status => {
      this.emailControlIsValid = status === 'VALID';
    });

    this.form.get('password').statusChanges.subscribe(status => {
      this.passwordControlIsValid = status === 'VALID';
    });
  }

  onSubmit() {
    if (!this.form.valid) {
      return;
    }

    const email = this.form.get('email').value;
    const password = this.form.get('password').value;

    this.loading = true;

    this.callLoginMutation(email, password);
  }

  onRegisterClick() {
    this.router.navigate(['./register']);
  }

  callLoginMutation(email: string, password: string) {
    let user: User;

    return this.apollo.mutate({
      mutation: login,
      variables: {
        email,
        password
      }
    }).subscribe(({ data }) => {
      if (data.login === null) {
        this.querySubscription = this.apollo.watchQuery<any>({
          query: userByEmail(email)
        })
          .valueChanges
          .subscribe(({ data, loading }) => {
            this.subLoading = loading;
            user = data.userByEmail;
            localStorage.setItem('currentUser', JSON.stringify(user));
            this.authService.setCurrentUser(user);
            if (user) {
              this.router.navigate(['./dashboard']);
              this.openSnackBar('Success! Welcome back!' , 'Dismiss');
              this.resetForm();
            } else {
              this.loading = false;
            }
          });
      } else {
        this.openSnackBar(data.login[0].message, 'Dismiss');
        this.authService.setMessage(data.login[0].message);
        this.resetForm();
      }
    }, (error) => {
      console.log(error);
    });
  }

  resetForm() {
    this.form.reset();
    this.emailControlIsValid = true;
    this.passwordControlIsValid = true;
  }

  openSnackBar(message: string, action: string) {
    this.snackbar.open(message, action, {
      duration: 5000
    });
  }
}
