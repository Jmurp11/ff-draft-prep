import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { register } from './queries';

@Component({
  selector: 'app-create-profile',
  templateUrl: './create-profile.component.html',
  styleUrls: ['./create-profile.component.css']
})
export class CreateProfileComponent implements OnInit {
  id: number;
  form: FormGroup;
  nameControlIsValid = true;
  emailControlIsValid = true;
  passwordControlIsValid = true;
  confirmPasswordControlIsValid = true;
  passwordEqualConfirmPasswordIsValid = true;
  loading = false;

  constructor(
    private apollo: Apollo,
    private router: Router,
    private snackbar: MatSnackBar
  ) { }

  ngOnInit() {
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
  }

  onRegisterSubmit() {
    if (this.form.get('password').value === this.form.get('confirmPassword').value) {
      return this.apollo.mutate({
        mutation: register,
        variables: {
          email: this.form.get('email').value,
          password: this.form.get('password').value,
          username: this.form.get('username').value
        }
      }).subscribe(({ data }) => {
        if (!data.register.success[0].message) {
          this.openSnackBar(data.register[0].errors[0].message, 'Dismiss');
        } else {
          this.router.navigate(['./login']);
          this.openSnackBar('Success! Welcome to DraftShark', 'Dismiss');
          this.form.reset();
        }
        return data;
      }, (error) => {
        console.log(error);
      });
    } else {
      this.passwordEqualConfirmPasswordIsValid = false;
      this.openSnackBar('Registration failed!', 'Dismiss');
    }
  }


  onLoginClick() {
    this.router.navigate(['./login']);
  }

  openSnackBar(message: string, action: string) {
    this.snackbar.open(message, action, {
      duration: 5000
    });
  }
}
