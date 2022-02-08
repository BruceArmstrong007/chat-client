import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserInterface } from '../../types/user.interface';
import { UserDataInterface } from '../../types/userData.interface';

export const userFeatureSelector = createFeatureSelector<UserInterface>('user');

export const verificationSelector = createSelector(
  userFeatureSelector,
  (userState: UserInterface) => userState.verification
);

export const isLogggedInuserSelector = createSelector(
  userFeatureSelector,
  (userState: UserInterface) => userState.isLoggedIn
);

export const userSelector = createSelector(
  userFeatureSelector,
  (userState: UserInterface) => userState.user
);

export const usernameSelector = createSelector(
  userSelector,
  (userState: UserDataInterface) => userState.username
);
