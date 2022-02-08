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
import { ResponseInterface } from 'src/app/shared/types/response.interface';
import { ChatService } from '../../services/chat.service';
import {
  fetchChatAction,
  fetchChatFailureAction,
  fetchChatSuccessAction,
  joinAction,
  leaveAction,
  messageAction,
} from '../actions/chat.action';

@Injectable()
export class ChatEffect {
  user: string | undefined;
  horizontal: MatSnackBarHorizontalPosition = 'right';
  vertical: MatSnackBarVerticalPosition = 'bottom';
  constructor(
    private chatService: ChatService,
    private router: Router,
    private actions$: Actions,
    private snackBar: MatSnackBar,
    private persistanceService: PersistanceService,
    private store: Store,
    private route: ActivatedRoute
  ) {}

  fetch$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchChatAction),
      exhaustMap(({ request }) => {
        return this.chatService.fetch(request).pipe(
          map((response: ResponseInterface) => {
            if (response.success == true) {
              return fetchChatSuccessAction({ response });
            } else {
              return fetchChatFailureAction({ response });
            }
          }),
          catchError((err) => {
            let response: ResponseInterface = {
              success: false,
              message: 'Error: ' + err.message,
              payload: [],
            };
            return of(fetchChatFailureAction({ response }));
          })
        );
      })
    )
  );

  join$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(joinAction),
        tap(({ join }) => {
          this.chatService.joinRoom(join);
          return;
        })
      ),
    { dispatch: false }
  );

  leave$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(leaveAction),
        tap(({ request }) => {
          this.chatService.leaveRoom(request);
          return;
        })
      ),
    { dispatch: false }
  );

  message$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(messageAction),
        tap(({ request }) => {
          this.chatService.sendMessage(request);
          return;
        })
      ),
    { dispatch: false }
  );
}
