import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthResponse, AuthService } from '../auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  passwordIsValid: boolean;
  form: FormGroup;
  token: string;
  change$: Subscription;
  dismissSnackbar: string;
  password: string;
  loading: boolean;

  constructor(
    private _auth: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private snackbar: MatSnackBar
  ) { }

  ngOnInit() {
    this.loading = false;
    this.dismissSnackbar = 'Dismiss';
    this.passwordIsValid = true;
    this.token = this.token = this.route.snapshot.paramMap.get('token');

    this.change$ = this._auth.changePassStatus.subscribe(response => {
      if (response) {
        if (response.success) {
          this.router.navigate(['dashboard']);
          this.openSnackBar(`Password updated successfully!`, this.dismissSnackbar);
          this.resetForm();
        } else {
          this.openSnackBar(response.message, this.dismissSnackbar);
          this.resetForm();
        }
      }
    });

    this.form = new FormGroup({
      password: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required, Validators.minLength(8)]
      })
    });

    this.form.get('password').statusChanges.subscribe(status => {
      this.passwordIsValid = status === 'VALID';
    });
  }

  onSubmit() {
    if (!this.form.valid) {
      return;
    }

    this.password = this.form.get('password').value;

    this._auth.changePassword(this.token, this.password);

    this.loading = true;
  }

  resetForm() {
    this.form.reset();
    this.passwordIsValid = true;
    this.loading = false;
  }

  openSnackBar(message: string, action: string) {
    this.snackbar.open(message, action, {
      duration: 5000
    });
  }

  ngOnDestroy() {
    if (this.change$) {
      this.change$.unsubscribe();
    }
  }
}
