import { Component, OnInit, OnDestroy } from '@angular/core';
import { ThemeService } from '../theme.service';
import { AuthStoreService } from '../../auth/auth-store.service';
import { Subscription } from 'rxjs';
import { LoginComponent } from '../../auth/login/login.component';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RegisterComponent } from '../../auth/register/register.component';
import { ApolloAngularSDK, RegisterInput } from '../../sdk/generated/graphql';
import { Router } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit, OnDestroy {

  menuItems: any[];
  themes: any;
  layoutConf: any;
  isAuth: boolean;
  userSub: Subscription;
  registerSub: Subscription;

  constructor(
    private themeService: ThemeService,
    private authStore: AuthStoreService,
    private apolloSdk: ApolloAngularSDK,
    private dialog: MatDialog,
    private snack: MatSnackBar,
    private router: Router
  ) {
    this.isAuth = true;
  }

  ngOnInit() {
    this.userSub = this.authStore.stateChanged
      .subscribe(state => {
        if (state.currentUser) {
          this.isAuth = state.currentUser ? true : false;
        } else {
          this.isAuth = false;
        }
      });

    this.themes = this.themeService.themes;
  }

  changeTheme(prevTheme, theme) {
    return this.themeService.changeTheme(prevTheme, theme.name);
  }

  openLoginDialog() {
    const dialogRef: MatDialogRef<any> = this.dialog.open(LoginComponent, {
      width: '40em',
      disableClose: true
    });

    dialogRef.afterClosed()
      .subscribe(res => {
        if (!res) {
          return;
        }

        const loginSub = this.authStore.login(
          res.email,
          res.password
        );

        loginSub.subscribe(val => {
          if (val.data.login.success) {
            this.snack.open(`Welcome back ${val.data.login.success.user.username.toUpperCase()}!`, 'Dismiss', { duration: 4000 });
          } else {
            this.snack.open(`${val.data.login.errors.message}`, 'Dismiss', { duration: 4000 });
          }
        });
      });
  }

  openRegisterDialog() {
    const dialogRef: MatDialogRef<any> = this.dialog.open(RegisterComponent, {
      width: '40em',
      disableClose: true
    });

    dialogRef.afterClosed()
      .subscribe(res => {
        if (!res) {
          return;
        }

        const registerInput: RegisterInput = {
          email: res.email,
          username: res.username,
          password: res.password
        };

        this.registerSub = this.apolloSdk.register({
          data: registerInput
        }).subscribe(val => {
          if (val.data.register.success) {
            this.snack.open(`${val.data.register.success[0].message}!`, 'Dismiss', { duration: 4000 });
          } else {
            this.snack.open(`${val.data.register.errors[0].message}`, 'Dismiss', { duration: 4000 });
          }
        });
      });
  }

  navigateToDashboard() {
    if (!this.isAuth) {
      return;
    }

    return this.router.navigate(['dashboard']);
  }

  signOut() {
    this.authStore.logout();
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}
