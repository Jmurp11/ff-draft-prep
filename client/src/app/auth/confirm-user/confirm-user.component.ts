import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as fromApp from '../../store/app.reducer';
import * as AuthActions from '../store/auth.action';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-confirm-user',
  templateUrl: './confirm-user.component.html',
  styleUrls: ['./confirm-user.component.css']
})
export class ConfirmUserComponent implements OnInit, OnDestroy {
  token: string;
  auth$: Subscription;
  dismissSnackbar: string;
  authMessage: string;

  constructor(
    private route: ActivatedRoute,
    private store: Store<fromApp.AppState>,
    private snackbar: MatSnackBar
  ) { }

  ngOnInit() {
    this.dismissSnackbar = 'Dismiss';
    this.token = this.route.snapshot.paramMap.get('token');

    this.auth$ = this.store.select('auth')
      .subscribe(data => {
        this.authMessage = data.authError;
        if (this.authMessage) {
          this.openSnackBar(this.authMessage, this.dismissSnackbar);
        } else {
          if (data.actionStatus) {
            this.openSnackBar(`User confirmed!`, this.dismissSnackbar);
          }
        }
      });
  }

  onConfirmClick() {
    return this.store.dispatch(new AuthActions.ConfirmUserStart({token: this.token}));
  }

  openSnackBar(message: string, action: string) {
    this.snackbar.open(message, action, {
      duration: 5000
    });
  }

  ngOnDestroy() {
    if (this.auth$) {
      this.auth$.unsubscribe();
    }
  }
}
