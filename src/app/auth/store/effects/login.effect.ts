import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, concatMap, map, of, switchMap, tap } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

import { AuthService } from '../../services/auth.service';
import { ResponseInterface } from 'src/app/shared/types/response.interface';

import {
  loginAction,
  loginFailureAction,
  loginSuccessAction,
  logoutAction,
} from '../actions/login.action';
import { PersistanceService } from 'src/app/shared/services/persistance.service';
import { UserInterface } from 'src/app/user/types/user.interface';
import { isLoggedinAction } from 'src/app/user/store/actions/user.action';
import { Store } from '@ngrx/store';

@Injectable()
export class LoginEffect {
  horizontal: MatSnackBarHorizontalPosition = 'right';
  vertical: MatSnackBarVerticalPosition = 'bottom';
  constructor(
    private authService: AuthService,
    private router: Router,
    private actions$: Actions,
    private snackBar: MatSnackBar,
    private persistanceService: PersistanceService,
    private store: Store,
    private cookieService: CookieService
  ) {}

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loginAction),
      concatMap(({ request }) => {
        return this.authService.login(request).pipe(
          map((response: ResponseInterface) => {
            if (response.success == true) {
              return loginSuccessAction({ response });
            } else {
              return loginFailureAction({ response });
            }
          }),
          catchError((err) => {
            let response: ResponseInterface = {
              success: false,
              message: 'Error: ' + err.message,
              payload: [],
            };
            return of(loginFailureAction({ response }));
          })
        );
      })
    )
  );

  loginSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(loginSuccessAction),
        tap(({ response }) => {
          this.persistanceService.set(
            'user',
            response.payload[0].state.user.username
          );
          this.persistanceService.set(
            'token',
            response.payload[0].state.verification
          );
          this.snackBar.open(response.message, 'close', {
            horizontalPosition: this.horizontal,
            verticalPosition: this.vertical,
            duration: 2000,
          });
          let request = response.payload[0].state;
          of(isLoggedinAction({ request }));
          return this.router.navigate([
            '/user/' + response.payload[0].state.user.username + '/chat',
          ]);
        })
      ),
    { dispatch: false }
  );

  loginFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(loginFailureAction),
        tap(({ response }) => {
          this.snackBar.open(response.message, 'close', {
            horizontalPosition: this.horizontal,
            verticalPosition: this.vertical,
            duration: 2000,
          });
        })
      ),
    { dispatch: false }
  );

  logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(logoutAction),
        concatMap(({ request }) => {
          return this.authService.logout(request).pipe(
            map((response: ResponseInterface) => {
              this.persistanceService.delete('user');
              this.persistanceService.delete('token');
              this.snackBar.open('Logged Out', 'close', {
                horizontalPosition: this.horizontal,
                verticalPosition: this.vertical,
                duration: 2000,
              });

              return this.router.navigate(['/auth/login']);
            })
          );
        })
      ),
    { dispatch: false }
  );
}
