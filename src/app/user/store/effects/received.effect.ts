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
import { UserService } from '../../services/user.service';
import { ResponseInterface } from 'src/app/shared/types/response.interface';
import {
  undoReceivedAction,
  undoReceivedFailureAction,
  undoReceivedSuccessAction,
} from '../actions/recieved.action';
import {
  acceptAction,
  acceptFailureAction,
  acceptSuccessAction,
} from '../actions/sent.action';

@Injectable()
export class ReceivedEffect {
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

  undoReceived$ = createEffect(() =>
    this.actions$.pipe(
      ofType(undoReceivedAction),
      exhaustMap(({ request }) => {
        return this.userService.undo(request).pipe(
          map((response: ResponseInterface) => {
            if (response.success == true) {
              return undoReceivedSuccessAction({ response });
            } else {
              return undoReceivedFailureAction({ response });
            }
          }),
          catchError((err) => {
            let response: ResponseInterface = {
              success: false,
              message: 'Error: ' + err.message,
              payload: [],
            };
            return of(undoReceivedFailureAction({ response }));
          })
        );
      })
    )
  );

  undoSent$ = createEffect(() =>
    this.actions$.pipe(
      ofType(acceptAction),
      exhaustMap(({ request }) => {
        return this.userService.accept(request).pipe(
          map((response: ResponseInterface) => {
            if (response.success == true) {
              return acceptSuccessAction({ response });
            } else {
              return acceptFailureAction({ response });
            }
          }),
          catchError((err) => {
            let response: ResponseInterface = {
              success: false,
              message: 'Error: ' + err.message,
              payload: [],
            };
            return of(acceptFailureAction({ response }));
          })
        );
      })
    )
  );

  after$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          undoReceivedSuccessAction,
          undoReceivedFailureAction,
          acceptSuccessAction,
          acceptFailureAction
        ),
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
