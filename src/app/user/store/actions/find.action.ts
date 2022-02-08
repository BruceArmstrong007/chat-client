import { createAction, props } from '@ngrx/store';
import { ResponseInterface } from 'src/app/shared/types/response.interface';
import { AddInterface } from '../../types/add.interface';
import { FetchInterface } from '../../types/fetch.interface';
import { ActionTypes } from './actionTypes';

export const findAction = createAction(
  ActionTypes.USER_FIND,
  props<{ request: FetchInterface }>()
);

export const findSuccessAction = createAction(
  ActionTypes.USER_FIND_SUCCESS,
  props<{ response: ResponseInterface }>()
);

export const findFailureAction = createAction(
  ActionTypes.USER_FIND_FAILURE,
  props<{ response: ResponseInterface }>()
);

export const addAction = createAction(
  ActionTypes.USER_ADD,
  props<{ request: AddInterface }>()
);

export const addSuccessAction = createAction(
  ActionTypes.USER_ADD_SUCCESS,
  props<{ response: ResponseInterface }>()
);

export const addFailureAction = createAction(
  ActionTypes.USER_ADD_FAILURE,
  props<{ response: ResponseInterface }>()
);
