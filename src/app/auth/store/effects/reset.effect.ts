import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of, switchMap, tap } from 'rxjs';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

import { AuthService } from '../../services/auth.service';
import { ResponseInterface } from 'src/app/shared/types/response.interface';
import {
  resetAction,
  resetFailureAction,
  resetSuccessAction,
} from '../actions/reset.action';

@Injectable()
export class ResetEffect {
  horizontal: MatSnackBarHorizontalPosition = 'right';
  vertical: MatSnackBarVerticalPosition = 'bottom';
  constructor(
    private authService: AuthService,
    private router: Router,
    private actions$: Actions,
    private snackBar: MatSnackBar
  ) {}

  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(resetAction),
      exhaustMap(({ request }) => {
        return this.authService.reset(request).pipe(
          map((response: ResponseInterface) => {
            if (response.success == true) {
              // this.persistanceService.set('accessToken', currentUser.token);
              return resetSuccessAction({ response });
            } else {
              return resetFailureAction({ response });
            }
          }),
          catchError((err) => {
            let response = {
              success: false,
              message: 'Error: ' + err.message,
              payload: [],
            };
            return of(resetFailureAction({ response }));
          })
        );
      })
    )
  );

  registerSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(resetSuccessAction),
        tap(({ response }) => {
          this.snackBar.open(response.message, 'close', {
            horizontalPosition: this.horizontal,
            verticalPosition: this.vertical,
            duration: 2000,
          });
          this.router.navigate(['/auth/login']);
        })
      ),
    { dispatch: false }
  );

  registerFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(resetFailureAction),
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
