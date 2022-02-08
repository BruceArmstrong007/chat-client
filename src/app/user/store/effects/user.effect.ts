import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of, switchMap, tap } from 'rxjs';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

import { PersistanceService } from 'src/app/shared/services/persistance.service';
import {
  isLoggedinAction,
  isLoggedoutAction,
  userFetchAction,
  userFetchFailureAction,
  userFetchSuccessAction,
} from 'src/app/user/store/actions/user.action';
import { Store } from '@ngrx/store';
import { AuthInterface } from 'src/app/auth/types/auth.interface';
import { logoutAction } from 'src/app/auth/store/actions/login.action';
import { UserDataInterface } from '../../types/userData.interface';
import { UserService } from '../../services/user.service';
import { ResponseInterface } from 'src/app/shared/types/response.interface';

@Injectable()
export class UserEffect {
  horizontal: MatSnackBarHorizontalPosition = 'right';
  vertical: MatSnackBarVerticalPosition = 'bottom';
  constructor(
    private userService: UserService,
    private router: Router,
    private actions$: Actions,
    private snackBar: MatSnackBar,
    private persistanceService: PersistanceService,
    private store: Store
  ) {}

  isLogout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(isLoggedoutAction),
        tap(() => {
          let request: AuthInterface = {
            isLoggedIn: false,
            isReset: false,
            isRegistered: false,
            isSubmitting: false,
            validationError: null,
          };
          return this.store.dispatch(logoutAction({ request }));
        })
      ),
    { dispatch: false }
  );

  fetch$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userFetchAction),
      exhaustMap(({ request }) => {
        return this.userService.fetch(request).pipe(
          map((res: ResponseInterface) => {
            if (res.success == true) {
              let response: UserDataInterface = res.payload[0].user;
              return userFetchSuccessAction({ response });
            } else {
              let response = res;
              return userFetchFailureAction({ response });
            }
          }),
          catchError((err) => {
            let response: ResponseInterface = {
              success: false,
              message: 'Error: ' + err.message,
              payload: [],
            };
            return of(userFetchFailureAction({ response }));
          })
        );
      })
    )
  );

  fetchFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(userFetchFailureAction),
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
}
