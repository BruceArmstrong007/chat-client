import { Action, createReducer, on } from '@ngrx/store';
import { AuthInterface } from '../../types/auth.interface';
import {
  loginAction,
  loginFailureAction,
  loginSuccessAction,
  logoutAction,
} from '../actions/login.action';
import {
  registerAction,
  registerFailureAction,
  registerSuccessAction,
} from '../actions/register.action';
import {
  resetAction,
  resetFailureAction,
  resetSuccessAction,
} from '../actions/reset.action';

const initialState: AuthInterface = {
  isSubmitting: false,
  isRegistered: false,
  isLoggedIn: false,
  isReset: false,
  validationError: null,
};

const authReducer = createReducer(
  initialState,
  on(
    registerAction,
    (state): AuthInterface => ({
      ...state,
      isSubmitting: true,
      validationError: null,
    })
  ),
  on(
    registerSuccessAction,
    (state): AuthInterface => ({
      ...state,
      isSubmitting: false,
      isRegistered: true,
    })
  ),
  on(
    registerFailureAction,
    (state, action): AuthInterface => ({
      ...state,
      isSubmitting: false,
      validationError: action.response.message,
    })
  ),
  on(
    loginAction,
    (state, action): AuthInterface => ({
      ...state,
      isSubmitting: true,
      validationError: null,
    })
  ),
  on(
    loginSuccessAction,
    (state, action): AuthInterface => ({
      ...state,
      isSubmitting: false,
      isLoggedIn: true,
    })
  ),
  on(
    loginFailureAction,
    (state, action): AuthInterface => ({
      ...state,
      isSubmitting: false,
      validationError: action.response.message,
    })
  ),
  on(
    resetAction,
    (state): AuthInterface => ({
      ...state,
      isSubmitting: true,
      validationError: null,
    })
  ),
  on(
    resetSuccessAction,
    (state, action): AuthInterface => ({
      ...state,
      isSubmitting: false,
      isReset: true,
    })
  ),
  on(
    resetFailureAction,
    (state, action): AuthInterface => ({
      ...state,
      isSubmitting: false,
      validationError: action.response.message,
    })
  ),
  on(
    logoutAction,
    (state, action): AuthInterface => ({
      ...state,
      ...action.request,
    })
  )
);

export function authReducers(state: AuthInterface, action: Action) {
  return authReducer(state, action);
}
