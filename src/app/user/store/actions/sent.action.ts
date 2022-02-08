import { createAction, props } from '@ngrx/store';
import { ResponseInterface } from 'src/app/shared/types/response.interface';
import { AddInterface } from '../../types/add.interface';
import { ActionTypes } from './actionTypes';

export const undoSentAction = createAction(
  ActionTypes.USER_UNDO_RECEIVED,
  props<{ request: AddInterface }>()
);

export const undoSentSuccessAction = createAction(
  ActionTypes.USER_UNDO_RECEIVED_SUCCESS,
  props<{ response: ResponseInterface }>()
);

export const undoSentFailureAction = createAction(
  ActionTypes.USER_UNDO_RECEIVED_FAILURE,
  props<{ response: ResponseInterface }>()
);

export const acceptAction = createAction(
  ActionTypes.USER_ACCEPT,
  props<{ request: AddInterface }>()
);

export const acceptSuccessAction = createAction(
  ActionTypes.USER_ACCEPT_SUCCESS,
  props<{ response: ResponseInterface }>()
);

export const acceptFailureAction = createAction(
  ActionTypes.USER_ACCEPT_FAILURE,
  props<{ response: ResponseInterface }>()
);
