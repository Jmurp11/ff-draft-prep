import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import * as AuthActions from '../store/auth.action';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form: FormGroup;
  register$: Subscription;
  nameIsValid: boolean;
  emailIsValid: boolean;
  passwordIsValid: boolean;
  confirmPasswordIsValid: boolean;
  passwordEqualConfirmPasswordIsValid: boolean;
  isValidImage: boolean;
  loading: boolean;
  authError: string;
  dismissSnackbar = 'Dismiss';

  constructor(
    private router: Router,
    private snackbar: MatSnackBar,
    private store: Store<fromApp.AppState>
  ) { }

  ngOnInit() {
    this.nameIsValid = true;
    this.emailIsValid = true;
    this.passwordIsValid = true;
    this.confirmPasswordIsValid = true;
    this.passwordEqualConfirmPasswordIsValid = true;
    this.isValidImage = true;
    this.loading = false;
    const pattern = '(http)?s?:?(\/\/[^"\']*\.(?:png|jpg|jpeg|gif))';

    this.register$ = this.store.select('auth')
      .subscribe(data => {
        this.loading = data.loading;
        this.authError = data.authError;

        if (this.authError) {
          this.openSnackBar(this.authError, this.dismissSnackbar);
          this.resetForm();
        } else {
          if (data.actionStatus) {
            this.openSnackBar(`Thanks for registering! Check your email for confirmation!`, this.dismissSnackbar);
            this.resetForm();
          }
        }
      });

    this.form = new FormGroup({
      username: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required, Validators.minLength(2)]
      }),
      email: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required, Validators.email]
      }),
      password: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required, Validators.minLength(8)]
      }),
      confirmPassword: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required, Validators.minLength(8)]
      }),
      profileImage: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.pattern(pattern)]
      })
    });

    this.form.get('username').statusChanges.subscribe(status => {
      this.nameIsValid = status === 'VALID';
    });

    this.form.get('email').statusChanges.subscribe(status => {
      this.emailIsValid = status === 'VALID';
    });

    this.form.get('password').statusChanges.subscribe(status => {
      this.passwordIsValid = status === 'VALID';
    });

    this.form.get('confirmPassword').statusChanges.subscribe(status => {
      this.confirmPasswordIsValid = status === 'VALID';
    });

    this.form.get('profileImage').statusChanges.subscribe(status => {
      this.isValidImage = status === 'VALID';
    });

  }

  async onRegisterSubmit() {
    if (this.form.get('password').value === this.form.get('confirmPassword').value) {
      this.loading = true;

      this.store.dispatch(new AuthActions.SignupStart(
        {
          email: this.form.get('email').value,
          password: this.form.get('password').value,
          username: this.form.get('username').value,
          profileImage: this.form.get('profileImage').value
        })
      );
    } else {
      this.passwordEqualConfirmPasswordIsValid = false;
      this.loading = false;
      this.openSnackBar('Registration failed!', 'Dismiss');
    }
  }


  onLoginClick() {
    this.router.navigate(['./login']);
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
}
