import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserInterface } from '../../types/user.interface';
import { UserDataInterface } from '../../types/userData.interface';
import { userFeatureSelector } from './user.selector';

export const userSelector = createSelector(
  userFeatureSelector,
  (userState: UserInterface) => userState.user
);

export const findSelector = createSelector(
  userSelector,
  (userState: UserDataInterface) => userState.details.find
);
