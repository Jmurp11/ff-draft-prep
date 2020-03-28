import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit, OnDestroy {
  forgotPass$: Subscription;
  form: FormGroup;
  email: string;
  dismissSnackbar: string;
  emailIsValid: boolean;
  loading: boolean;

  constructor(
    private router: Router,
    private _auth: AuthService,
    private snackbar: MatSnackBar
  ) { }

  ngOnInit() {
    this.emailIsValid = true;
    this.loading = false;
    this.dismissSnackbar = 'Dismiss';

    this.forgotPass$ = this._auth.forgotStatus.subscribe(response => {
      if (response) {
        if (response.success) {
          this.router.navigate(['dashboard']);
          this.openSnackBar(`Email sent to ${this.email}!`, this.dismissSnackbar);
          this.resetForm();
        } else {
          this.openSnackBar(response.message, this.dismissSnackbar);
          this.resetForm();
        }
      }
    });

    this.form = new FormGroup({
      email: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required, Validators.email]
      })
    });

    this.form.get('email').statusChanges.subscribe(status => {
      this.emailIsValid = status === 'VALID';
    });
  }

  onSubmit() {
    if (!this.form.valid) {
      return;
    }

    this.email = this.form.get('email').value;

    this._auth.forgotPassword(this.email);

    this.loading = true;

    this.resetForm();
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
  }

  openSnackBar(message: string, action: string) {
    this.snackbar.open(message, action, {
      duration: 5000
    });
  }

  ngOnDestroy() {
    this.forgotPass$.unsubscribe();
  }
}