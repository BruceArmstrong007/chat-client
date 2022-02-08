import { createAction, props } from '@ngrx/store';
import { ResponseInterface } from 'src/app/shared/types/response.interface';
import { FetchInterface } from '../../types/fetch.interface';
import { UserInterface } from '../../types/user.interface';
import { UserDataInterface } from '../../types/userData.interface';
import { ActionTypes } from './actionTypes';

export const isLoggedinAction = createAction(
  ActionTypes.ISLOGGEDIN,
  props<{ request: UserInterface }>()
);

export const isLoggedoutAction = createAction(
  ActionTypes.ISLOGGEDOUT,
  props<{ request: UserInterface }>()
);

export const userFetchAction = createAction(
  ActionTypes.USER_FETCH,
  props<{ request: FetchInterface }>()
);

export const userFetchSuccessAction = createAction(
  ActionTypes.USER_FETCH_SUCCESS,
  props<{ response: UserDataInterface }>()
);

export const userFetchFailureAction = createAction(
  ActionTypes.USER_FETCH_FAILURE,
  props<{ response: ResponseInterface }>()
);
