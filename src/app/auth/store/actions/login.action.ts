import { createAction, props } from '@ngrx/store';
import { AuthInterface } from '../../types/auth.interface';
import { ResponseInterface } from 'src/app/shared/types/response.interface';
import { LoginCredentialsInterface } from '../../types/loginCredentials.interface';
import { ActionTypes } from './actionTypes';

export const loginAction = createAction(
  ActionTypes.LOGIN,
  props<{ request: LoginCredentialsInterface }>()
);

export const loginSuccessAction = createAction(
  ActionTypes.LOGIN_SUCCESS,
  props<{ response: ResponseInterface }>()
);

export const loginFailureAction = createAction(
  ActionTypes.LOGIN_FAILURE,
  props<{ response: ResponseInterface }>()
);

export const logoutAction = createAction(
  ActionTypes.LOGOUT,
  props<{ request: AuthInterface }>()
);
