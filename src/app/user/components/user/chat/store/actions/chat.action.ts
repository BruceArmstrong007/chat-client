import { createAction, props } from '@ngrx/store';
import { ActionTypes } from './actionTypes';
import { ChatRequestInterface } from '../../types/chatRequest.interface';
import { ResponseInterface } from './../../../../../../shared/types/response.interface';
import { ChatFetchInterface } from '../../types/chatFetch.interface';
import { JoinInterface } from '../../types/join.interface';

export const fetchChatAction = createAction(
  ActionTypes.FETCH_CHAT,
  props<{ request: ChatFetchInterface }>()
);

export const fetchChatSuccessAction = createAction(
  ActionTypes.FETCH_CHAT_SUCCESS,
  props<{ response: ResponseInterface }>()
);

export const fetchChatFailureAction = createAction(
  ActionTypes.FETCH_CHAT_FAILURE,
  props<{ response: ResponseInterface }>()
);

export const leaveAction = createAction(
  ActionTypes.LEAVE,
  props<{ request: JoinInterface }>()
);

export const joinAction = createAction(
  ActionTypes.JOIN,
  props<{ join: JoinInterface }>()
);

export const messageAction = createAction(
  ActionTypes.MESSAGE,
  props<{ request: ChatRequestInterface }>()
);

export const pushAction = createAction(
  ActionTypes.PUSH,
  props<{ data: ChatRequestInterface }>()
);
