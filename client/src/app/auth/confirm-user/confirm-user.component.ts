import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-confirm-user',
  templateUrl: './confirm-user.component.html',
  styleUrls: ['./confirm-user.component.css']
})
export class ConfirmUserComponent implements OnInit {
  token: string;
  auth$: Subscription;
  dismissSnackbar: string;

  constructor(
    private _auth: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private snackbar: MatSnackBar
  ) { }

  ngOnInit() {
    this.dismissSnackbar = 'Dismiss';
    this.token = this.route.snapshot.paramMap.get('token');

    this.auth$ = this._auth.confirmStatus.subscribe(response => {
      if (response) {
        if (response.success) {
          this.router.navigate(['login']);
          this.openSnackBar('User is confirmed!', this.dismissSnackbar);
        } else {
          this.openSnackBar(response.message, this.dismissSnackbar);
        }
      }
    });
  }

  onConfirmClick() {
    return this._auth.confirmUser(this.token);
  }

  openSnackBar(message: string, action: string) {
    this.snackbar.open(message, action, {
      duration: 5000
    });
  }

  ngOnDestroy() {
    this.auth$.unsubscribe();
  }
}
