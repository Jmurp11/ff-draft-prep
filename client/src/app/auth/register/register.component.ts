import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  id: number;
  form: FormGroup;
  register$: Subscription;
  nameControlIsValid = true;
  emailControlIsValid = true;
  passwordControlIsValid = true;
  confirmPasswordControlIsValid = true;
  passwordEqualConfirmPasswordIsValid = true;
  isValidImage = true;
  loading = false;
  dismissSnackbar = 'Dismiss';

  constructor(
    private _auth: AuthService,
    private router: Router,
    private snackbar: MatSnackBar
  ) { }

  ngOnInit() {
    const pattern = '(http)?s?:?(\/\/[^"\']*\.(?:png|jpg|jpeg|gif))';
    this.register$ = this._auth.registerStatus.subscribe(response => {
      if (response) {
        if (response.success) {
          this.router.navigate(['login']);
          this.openSnackBar('Thanks for registering! Check your email for confirmation!', this.dismissSnackbar);
          this.resetForm();
        } else {
          this.openSnackBar(response.message, this.dismissSnackbar);
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
      this.nameControlIsValid = status === 'VALID';
    });

    this.form.get('email').statusChanges.subscribe(status => {
      this.emailControlIsValid = status === 'VALID';
    });

    this.form.get('password').statusChanges.subscribe(status => {
      this.passwordControlIsValid = status === 'VALID';
    });

    this.form.get('confirmPassword').statusChanges.subscribe(status => {
      this.confirmPasswordControlIsValid = status === 'VALID';
    });

    this.form.get('profileImage').statusChanges.subscribe(status => {
      this.isValidImage = status === 'VALID';
    });

  }

  async onRegisterSubmit() {
    if (this.form.get('password').value === this.form.get('confirmPassword').value) {
      this.loading = true;

      await this._auth.register(
        this.form.get('email').value,
        this.form.get('password').value,
        this.form.get('username').value,
        this.form.get('profileImage').value
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
    this.emailControlIsValid = true;
    this.passwordControlIsValid = true;
    this.loading = false;
  }

  openSnackBar(message: string, action: string) {
    this.snackbar.open(message, action, {
      duration: 5000
    });
  }
}
