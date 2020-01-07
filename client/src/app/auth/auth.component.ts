import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { Apollo } from 'apollo-angular';
import { AuthService } from './auth.service';
import { AlertService } from '../shared/alert.service';
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
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  private messageSubject: BehaviorSubject<string>;
  public message: Observable<string>;
  subLoading: boolean;
  loginResult: any;
  querySubscription: Subscription;

  constructor(
    private router: Router,
    private authService: AuthService,
    private alertService: AlertService,
    private apollo: Apollo
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
    let user: User;

    if (!this.form.valid) {
      return;
    }
    const email = this.form.get('email').value;
    const password = this.form.get('password').value;

    this.form.reset();
    this.emailControlIsValid = true;
    this.passwordControlIsValid = true;

    this.loading = true;

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
            } else {
              this.alertService.error(this.errMessage);
              this.loading = false;
            }
          });
      } else {
        this.authService.setMessage(data.login[0].message);
      }
    }, (error) => {
    });
  }

  onRegisterClick() {
    this.router.navigate(['./register']);
  }
}