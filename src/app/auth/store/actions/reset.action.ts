import { createAction, props } from '@ngrx/store';
import { ResponseInterface } from 'src/app/shared/types/response.interface';
import { ResetCredentialsInterface } from '../../types/resetCredentials.interface';
import { ActionTypes } from './actionTypes';

export const resetAction = createAction(
  ActionTypes.RESETPASSWORD,
  props<{ request: ResetCredentialsInterface }>()
);

export const resetSuccessAction = createAction(
  ActionTypes.RESETPASSWORD_SUCCESS,
  props<{ response: ResponseInterface }>()
);

export const resetFailureAction = createAction(
  ActionTypes.RESETPASSWORD_FAILURE,
  props<{ response: ResponseInterface }>()
);
