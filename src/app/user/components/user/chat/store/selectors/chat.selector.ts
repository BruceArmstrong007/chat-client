import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ChatInterface } from '../../types/chat.interface';

export const chatFeatureSelector = createFeatureSelector<ChatInterface>('chat');

export const friendsSelector = createSelector(
  chatFeatureSelector,
  (userState: ChatInterface) => userState.friends
);
