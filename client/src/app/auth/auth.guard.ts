import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private store: Store<fromApp.AppState>
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):
    boolean
    | Promise<boolean
      | UrlTree>
    | Observable<boolean
      | UrlTree>
    | UrlTree {
    return this.store.select('user')
      .pipe(
        take(1),
        map(data => {
          const isAuth = !!data.user;
          if (isAuth) {
            return true;
          }

          return this.router.createUrlTree(['/home']);
        })
      );
  }
}
