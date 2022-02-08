import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthInterface } from '../../types/auth.interface';

export const authFeatureSelector = createFeatureSelector<AuthInterface>('auth');

export const isSubmitingSelector = createSelector(
  authFeatureSelector,
  (authState: AuthInterface) => authState.isSubmitting
);

export const isRegisteredSelector = createSelector(
  authFeatureSelector,
  (authState: AuthInterface) => authState.isRegistered
);

export const validationErrorSelector = createSelector(
  authFeatureSelector,
  (authState: AuthInterface) => authState.validationError
);

export const isLogggedInSelector = createSelector(
  authFeatureSelector,
  (authState: AuthInterface) => authState.isLoggedIn
);

export const isResetSelector = createSelector(
  authFeatureSelector,
  (authState: AuthInterface) => authState.isReset
);
