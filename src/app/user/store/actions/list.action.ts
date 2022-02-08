import { createAction, props } from '@ngrx/store';
import { ResponseInterface } from 'src/app/shared/types/response.interface';
import { AddInterface } from '../../types/add.interface';
import { ActionTypes } from './actionTypes';

export const listAction = createAction(
  ActionTypes.USER_REMOVE,
  props<{ request: AddInterface }>()
);

export const listSuccessAction = createAction(
  ActionTypes.USER_REMOVE_SUCCESS,
  props<{ response: ResponseInterface }>()
);

export const listFailureAction = createAction(
  ActionTypes.USER_REMOVE_FAILURE,
  props<{ response: ResponseInterface }>()
);
