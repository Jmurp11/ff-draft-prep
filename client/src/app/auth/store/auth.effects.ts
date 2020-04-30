import { Actions, ofType } from '@ngrx/effects';
import { switchMap } from 'rxjs/operators';
import { Apollo } from 'apollo-angular';
import * as AuthActions from './auth.action';
import { login } from '../queries';

export class AuthEffects {
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
        .subscribe(({ data }) => { })
    })
  );

  constructor(
    private actions$: Actions,
    private apollo: Apollo
  ) { }
}
