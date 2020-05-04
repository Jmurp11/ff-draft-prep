import { Actions, ofType, Effect } from '@ngrx/effects';
import { map, catchError } from 'rxjs/operators';
import { Apollo } from 'apollo-angular';
import * as AuthActions from './auth.action';
import { login } from '../queries';

export class AuthEffects {
  @Effect()
  authLogin = this.actions$.pipe(
    ofType(AuthActions.LOGIN_START),
    map((authData: AuthActions.LoginStart) => {
      return this.apollo.mutate({
        mutation: login,
        variables: {
          email: authData.payload.email,
          password: authData.payload.password
        }
      })
        .subscribe(({ data }) => {
          console.log(data);
        });
    }) // .pipe(catchError(), map());
  );

  constructor(
    private actions$: Actions,
    private apollo: Apollo
  ) { }
}
