import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import * as fromApp from '../../store/app.reducer';
import * as AuthActions from '../store/auth.action';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  auth$: Subscription;
  login$: Subscription;
  form: FormGroup;
  emailIsValid: boolean;
  passwordIsValid: boolean;
  username: string;
  authMessage: string;
  loading: boolean;
  dismissSnackbar: string;

  constructor(
    private router: Router,
    private store: Store<fromApp.AppState>,
    private snackbar: MatSnackBar
  ) { }

  ngOnInit() {
    this.dismissSnackbar = 'Dismiss';
    this.loading = false;
    this.emailIsValid = true;
    this.passwordIsValid = true;

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
      this.emailIsValid = status === 'VALID';
    });

    this.form.get('password').statusChanges.subscribe(status => {
      this.passwordIsValid = status === 'VALID';
    });

    this.auth$ = this.store.select('auth')
      .subscribe(data => {
        if (data.user) {
          this.username = data.user.username;
          this.router.navigate(['/dashboard']);
        }

        this.loading = data.loading;
        this.authMessage = data.authError;
        if (this.authMessage) {
          this.openSnackBar(this.authMessage, this.dismissSnackbar);
          this.resetForm();
        } else {
          if (data.actionStatus) {
            this.openSnackBar(`Success! Welcome back ${this.username}!`, this.dismissSnackbar);
            this.resetForm();
          }
        }
      });
  }

  onSubmit() {
    if (!this.form.valid) {
      return;
    }

    const email = this.form.get('email').value;
    const password = this.form.get('password').value;

    this.loading = true;

    this.store.dispatch(new AuthActions.LoginStart({ email, password }));
  }

  onRegisterClick() {
    this.router.navigate(['./register']);
  }

  onForgotPasswordClick() {
    this.router.navigate(['./auth/forgot-password']);
  }

  resetForm() {
    this.form.reset();
    this.emailIsValid = true;
    this.passwordIsValid = true;
    this.loading = false;
  }

  openSnackBar(message: string, action: string) {
    this.snackbar.open(message, action, {
      duration: 5000
    });
  }

  ngOnDestroy() {
    if (this.login$) {
      this.login$.unsubscribe();
    }
    if (this.auth$) {
      this.auth$.unsubscribe();
    }
  }
}
