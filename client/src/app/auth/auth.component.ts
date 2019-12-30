import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from './auth.service';
import { AlertService } from '../shared/alert.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  form: FormGroup;
  emailControlIsValid = true;
  passwordControlIsValid = true;
  loading = false;
  errMessage: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private alertService: AlertService
  ) {
    if (this.authService.currentUserValue) {
      this.router.navigate(['/dashboard']);
    }
  }

  ngOnInit() {
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

    this.authService.message.subscribe(errStr => {
      this.errMessage = errStr;
      console.log(this.errMessage);
    });
  }

  onSubmit() {
    if (!this.form.valid) {
      return;
    }
    const email = this.form.get('email').value;
    const password = this.form.get('password').value;

    this.form.reset();
    this.emailControlIsValid = true;
    this.passwordControlIsValid = true;

    this.loading = true;
    const user = this.authService.login(email, password);
    if (user) {
      this.router.navigate(['./dashboard']);
    } else {
      this.alertService.error(this.errMessage);
      console.log(`Error: ${this.errMessage}`);
      this.loading = false;
    }
  }

  onRegister() {
    this.router.navigate(['./register']);
  }
}
