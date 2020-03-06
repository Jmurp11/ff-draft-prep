import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  authSub$: Subscription;
  loginSub$: Subscription;
  form: FormGroup;
  emailControlIsValid = true;
  passwordControlIsValid = true;
  loading = false;
  dismissSnackbar = 'Dismiss';

  constructor(
    private router: Router,
    private _auth: AuthService,
    private snackbar: MatSnackBar
  ) {}

  ngOnInit() {
    this.authSub$ = this._auth.user.subscribe(user => {
      if (user) {
        this.router.navigate(['/dashboard']);
      }
    });

    this.loginSub$ = this._auth.loginStatus.subscribe(response => {
      if (response.success) {
        this.router.navigate(['dashboard']);
        this.openSnackBar('Success! Welcome back!', this.dismissSnackbar);
        this.resetForm();
      } else {
        this.openSnackBar(response.message, this.dismissSnackbar);
        this.resetForm();
      }
    });

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

    this._auth.login(email, password);
  }

  onRegisterClick() {
    this.router.navigate(['./register']);
  }

  resetForm() {
    this.form.reset();
    this.emailControlIsValid = true;
    this.passwordControlIsValid = true;
    this.loading = false;
  }

  openSnackBar(message: string, action: string) {
    this.snackbar.open(message, action, {
      duration: 5000
    });
  }

  ngOnDestroy() {
    this.loginSub$.unsubscribe();
    this.authSub$.unsubscribe();
  }
}
