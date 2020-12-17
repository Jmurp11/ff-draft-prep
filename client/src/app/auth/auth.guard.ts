import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthStoreService } from './auth-store.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authStore: AuthStoreService
  ) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | boolean {
    return this.authStore.getCurrentUser()
      .pipe(
        map(res => {
          if (res) {
            return true;
          } else {
            this.router.navigate(['/landing'], {
              queryParams: {
                return: state.url
              }
            });
            return false;
          }
        })
      );
  }
}
