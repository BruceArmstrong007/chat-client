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
  listAction,
  listFailureAction,
  listSuccessAction,
} from '../actions/list.action';

@Injectable()
export class ListEffect {
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

  listRemove$ = createEffect(() =>
    this.actions$.pipe(
      ofType(listAction),
      exhaustMap(({ request }) => {
        return this.userService.remove(request).pipe(
          map((response: ResponseInterface) => {
            if (response.success == true) {
              return listSuccessAction({ response });
            } else {
              return listFailureAction({ response });
            }
          }),
          catchError((err) => {
            let response: ResponseInterface = {
              success: false,
              message: 'Error: ' + err.message,
              payload: [],
            };
            return of(listFailureAction({ response }));
          })
        );
      })
    )
  );

  after$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(listFailureAction, listSuccessAction),
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
