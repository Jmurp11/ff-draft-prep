import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RegisterService } from './register.service';

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
  loading = false;

  constructor(private registerService: RegisterService) { }

  ngOnInit() {
    this.form = new FormGroup({
      username: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      email: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required, Validators.email]
      }),
      password: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required, Validators.minLength(6)]
      }),
      confirmPassword: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required, Validators.minLength(6)]
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
    this.registerService.register(this.form.get('email').value, this.form.get('password').value, this.form.get('username').value);
  }
}
