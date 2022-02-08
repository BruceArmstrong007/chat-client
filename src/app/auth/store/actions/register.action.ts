import { createAction, props } from '@ngrx/store';
import { ResponseInterface } from 'src/app/shared/types/response.interface';
import { RegisterCredentialsInterface } from '../../types/registerCredentials.interface';
import { ActionTypes } from './actionTypes';

export const registerAction = createAction(
  ActionTypes.REGISTER,
  props<{ request: RegisterCredentialsInterface }>()
);

export const registerSuccessAction = createAction(
  ActionTypes.REGISTER_SUCCESS,
  props<{ response: ResponseInterface }>()
);

export const registerFailureAction = createAction(
  ActionTypes.REGISTER_FAILURE,
  props<{ response: ResponseInterface }>()
);
