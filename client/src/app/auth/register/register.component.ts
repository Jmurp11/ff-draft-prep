import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';
import { Subscription, merge } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {

  form: FormGroup;
  title: string;
  isEmailValid: boolean;
  isPasswordValid: boolean;
  isConfirmPasswordValid: boolean;
  isPasswordEqualConfirmPasswordValid: boolean;
  password: string;
  confirmPassword: string;
  mergeSub: Subscription;

  constructor(
    public dialogRef: MatDialogRef<LoginComponent>
  ) { }

  ngOnInit(): void {
    this.title = 'Sign Up';

    this.isEmailValid = true;
    this.isPasswordValid = true;
    this.isConfirmPasswordValid = true;
    this.isPasswordEqualConfirmPasswordValid = true;

    this.form = new FormGroup({
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
      username: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      })
    });

    this.form.get('email').statusChanges.subscribe(status => {
      this.isEmailValid = status === 'VALID';
    });

    this.form.get('password').statusChanges.subscribe(status => {
      this.isPasswordValid = status === 'VALID';
    });

    this.form.get('confirmPassword').statusChanges.subscribe(status => {
      this.isConfirmPasswordValid = status === 'VALID';
    });

    this.mergeSub = merge(
      this.form.get('password').valueChanges.pipe(map(val => this.password = val)),
      this.form.get('confirmPassword').valueChanges.pipe(map(val => this.confirmPassword = val))
    ).subscribe(() => (this.password === this.confirmPassword) ? this.isPasswordEqualConfirmPasswordValid = true :
      this.isPasswordEqualConfirmPasswordValid = false);
  }

  onSubmit() {
    this.dialogRef.close(this.form.value);
  }

  ngOnDestroy() {
    this.mergeSub.unsubscribe();
  }
}
