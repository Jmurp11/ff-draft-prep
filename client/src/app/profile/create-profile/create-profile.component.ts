import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RegisterService } from './register.service';
import { Router } from '@angular/router';

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
    private registerService: RegisterService,
    private router: Router) { }

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
      this.registerService.register(this.form.get('email').value, this.form.get('password').value, this.form.get('username').value);
      this.form.reset();
    } else {
      this.passwordEqualConfirmPasswordIsValid = false;
    }
  }

  onLoginClick() {
    this.router.navigate(['./login']);
  }
}
