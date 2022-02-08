import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of, switchMap, tap } from 'rxjs';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

import { PersistanceService } from 'src/app/shared/services/persistance.service';

import { Store } from '@ngrx/store';
import { UserDataInterface } from '../../types/userData.interface';
import { UserService } from '../../services/user.service';
import { ResponseInterface } from 'src/app/shared/types/response.interface';
import {
  addAction,
  addFailureAction,
  addSuccessAction,
  findAction,
  findFailureAction,
  findSuccessAction,
} from '../actions/find.action';

@Injectable()
export class FindEffect {
  user: string | undefined;
  horizontal: MatSnackBarHorizontalPosition = 'right';
  vertical: MatSnackBarVerticalPosition = 'bottom';
  constructor(
    private userService: UserService,
    private router: Router,
    private actions$: Actions,
    private snackBar: MatSnackBar,
    private persistanceService: PersistanceService,
    private store: Store,
    private route: ActivatedRoute
  ) {}

  find$ = createEffect(() =>
    this.actions$.pipe(
      ofType(findAction),
      exhaustMap(({ request }) => {
        this.user = this.route.snapshot.params['user'];
        if (this.user == request.username) {
          let response: ResponseInterface = {
            success: false,
            message: "Can't Search your Username",
            payload: [],
          };
          return of(findFailureAction({ response }));
        }
        return this.userService.find(request).pipe(
          map((response: ResponseInterface) => {
            if (response.success == true) {
              return findSuccessAction({ response });
            } else {
              return findFailureAction({ response });
            }
          }),
          catchError((err) => {
            let response: ResponseInterface = {
              success: false,
              message: 'Error: ' + err.message,
              payload: [],
            };
            return of(findFailureAction({ response }));
          })
        );
      })
    )
  );

  findFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(findFailureAction),
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

  add$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addAction),
      exhaustMap(({ request }) => {
        this.user = this.route.snapshot.params['user'];
        if (this.user == request.username) {
          let response: ResponseInterface = {
            success: false,
            message: "Can't Add your Username",
            payload: [],
          };
          return of(addFailureAction({ response }));
        }
        return this.userService.add(request).pipe(
          map((response: ResponseInterface) => {
            if (response.success == true) {
              return addSuccessAction({ response });
            } else {
              return addFailureAction({ response });
            }
          }),
          catchError((err) => {
            let response: ResponseInterface = {
              success: false,
              message: 'Error: ' + err.message,
              payload: [],
            };
            return of(addFailureAction({ response }));
          })
        );
      })
    )
  );

  afterAdd$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(addSuccessAction, addFailureAction),
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
