import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { select, Store } from '@ngrx/store';
import { filter, map, Observable, tap } from 'rxjs';

import { PersistanceService } from 'src/app/shared/services/persistance.service';
import {
  isLoggedinAction,
  userFetchAction,
} from '../store/actions/user.action';
import { usernameSelector } from '../store/selectors/user.selector';
import { UserInterface } from '../types/user.interface';
import { FetchInterface } from '../types/fetch.interface';

@Injectable({
  providedIn: 'root',
})
export class UserGuard implements CanActivate {
  username$: Observable<string | null> | undefined;
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    this.username$ = this.store.pipe(select(usernameSelector));
    return this.username$.pipe(
      map((user) => {
        let param = route.params['user'];
        let userStorage = this.persistanceService.get('user');
        if (userStorage === null) {
          this.router.navigate(['/auth/login']);
          return false;
        } else if (user !== null && user === userStorage) {
          if (user !== param)
            this.router.navigate(['/user/' + userStorage + '/chat']);
          return true;
        } else {
          let token = this.persistanceService.get('token');
          if (token != null) {
            let request: FetchInterface = {
              username: userStorage,
              token: token,
            };
            this.store.dispatch(userFetchAction({ request }));
            return true;
          } else {
            this.router.navigate(['/auth/login']);
            return false;
          }
        }
      })
    );
  }
  auth() {}
  constructor(
    private store: Store,
    private router: Router,
    private persistanceService: PersistanceService,
    private cookieService: CookieService
  ) {}
}
