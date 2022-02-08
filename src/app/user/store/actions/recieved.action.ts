import { createAction, props } from '@ngrx/store';
import { ResponseInterface } from 'src/app/shared/types/response.interface';
import { AddInterface } from '../../types/add.interface';
import { ActionTypes } from './actionTypes';

export const undoReceivedAction = createAction(
  ActionTypes.USER_UNDO_RECEIVED,
  props<{ request: AddInterface }>()
);

export const undoReceivedSuccessAction = createAction(
  ActionTypes.USER_UNDO_RECEIVED_SUCCESS,
  props<{ response: ResponseInterface }>()
);

export const undoReceivedFailureAction = createAction(
  ActionTypes.USER_UNDO_RECEIVED_FAILURE,
  props<{ response: ResponseInterface }>()
);
