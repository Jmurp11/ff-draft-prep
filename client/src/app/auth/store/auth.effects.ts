import { Injectable } from '@angular/core';
import { Actions, ofType, Effect } from '@ngrx/effects';
import { map, catchError, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Apollo } from 'apollo-angular';
import * as AuthActions from './auth.action';
import { login, register, confirmUser, changePassword, forgotPassword } from '../queries';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {
  @Effect()
  authSignup = this.actions$.pipe(
    ofType(AuthActions.SIGNUP_START),
    switchMap((authData: AuthActions.SignupStart) => {
      return this.apollo.mutate({
        mutation: register,
        variables: {
          email: authData.payload.email,
          password: authData.payload.password,
          username: authData.payload.username,
          profileImage: authData.payload.profileImage
        }
      })
        .pipe(
          map(resData => {
            if (!resData.data.register.success) {
              return new AuthActions.SignupFail(resData.data.register.errors[0].message);
            }

            return new AuthActions.Signup(resData.data.register.success.message);
          }),
          catchError(error => {
            return of(new AuthActions.SignupFail(error));
          })
        );
    })
  );

  @Effect()
  authLogin = this.actions$.pipe(
    ofType(AuthActions.LOGIN_START),
    switchMap((authData: AuthActions.LoginStart) => {
      return this.apollo.mutate({
        mutation: login,
        variables: {
          email: authData.payload.email,
          password: authData.payload.password
        }
      })
        .pipe(
          map(resData => {
            if (!resData.data.login.success) {
              return new AuthActions.LoginFail(resData.data.login.errors[0].message);
            }

            const expirationDate = new Date(
              new Date().getTime() + +resData.data.login.success.expiresIn * 1000
            );

            return new AuthActions.Login({
              id: resData.data.login.success.user.id,
              email: resData.data.login.success.user.email,
              username: resData.data.login.success.user.username,
              profileImage: resData.data.login.success.user.profileImage,
              token: resData.data.login.success.user.token,
              expirationDate
            });
          }),
          catchError(error => {
            return of(new AuthActions.LoginFail(error));
          }),
        );
    })
  );

  @Effect()
  authConfirmUser = this.actions$.pipe(
    ofType(AuthActions.CONFIRMUSER_START),
    switchMap((authData: AuthActions.ConfirmUserStart) => {
      return this.apollo.mutate({
        mutation: confirmUser,
        variables: {
          token: authData.payload.token
        }
      })
        .pipe(
          map(resData => {
            if (!resData.data.confirmUser.success) {
              return new AuthActions.ConfirmUserFail(resData.data.confirmUser.errors[0].message);
            }

            return new AuthActions.ConfirmUser(resData.data.confirmUser.success.message);
          }),
          catchError(error => {
            return of(new AuthActions.ConfirmUserFail(error));
          }),
        );
    })
  );

  @Effect()
  authChangePassword = this.actions$.pipe(
    ofType(AuthActions.CHANGEPASSWORD_START),
    switchMap((authData: AuthActions.ChangePasswordStart) => {
      return this.apollo.mutate({
        mutation: changePassword,
        variables: {
          token: authData.payload.token,
          password: authData.payload.password
        }
      })
        .pipe(
          map(resData => {
            if (!resData.data.changePassword.success) {
              return new AuthActions.ChangePasswordFail(resData.data.changePassword.errors[0].message);
            }

            return new AuthActions.ChangePassword(resData.data.changePassword.success.message);
          }),
          catchError(error => {
            return of(new AuthActions.ChangePasswordFail(error));
          }),
        );
    })
  );

  @Effect()
  authForgotPassword = this.actions$.pipe(
    ofType(AuthActions.FORGOTPASSWORD_START),
    switchMap((authData: AuthActions.ForgotPasswordStart) => {
      return this.apollo.mutate({
        mutation: forgotPassword,
        variables: {
          email: authData.payload.email
        }
      })
        .pipe(
          map(resData => {
            if (!resData.data.login.success) {
              return new AuthActions.ForgotPasswordFail(resData.data.forgotPassword.errors[0].message);
            }

            return new AuthActions.ForgotPassword(resData.data.forgotPassword.success.message);
          }),
          catchError(error => {
            return of(new AuthActions.ForgotPasswordFail(error));
          }),
        );
    })
  );

  @Effect({ dispatch: false })
  authSuccess = this.actions$
    .pipe(ofType(
      AuthActions.LOGIN), tap(() => {
        this.router.navigate(['/dashboard']);
      })
    );

  constructor(
    private actions$: Actions,
    private apollo: Apollo,
    private router: Router
  ) { }
}
