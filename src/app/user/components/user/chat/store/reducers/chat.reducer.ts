import { Action, createReducer } from '@ngrx/store';
import { on } from '@ngrx/store';
import { ChatInterface } from '../../types/chat.interface';
import {
  fetchChatAction,
  fetchChatFailureAction,
  fetchChatSuccessAction,
  joinAction,
  leaveAction,
  messageAction,
  pushAction,
} from '../actions/chat.action';

const initialState: ChatInterface = {
  friends: {},
};

const chatReducer = createReducer(
  initialState,
  on(
    fetchChatAction,
    fetchChatFailureAction,
    leaveAction,
    joinAction,
    (state): ChatInterface => ({
      ...state,
    })
  ),
  // on(
  //   messageAction,
  //   (state, action): ChatInterface => ({
  //     ...state,
  //     friends: {
  //       ...state.friends,
  //       [action.request.room]: [
  //         ...state.friends[action.request.room],
  //         {
  //           id: action.request.id,
  //           message: action.request.message,
  //           user: action.request.user,
  //         },
  //       ],
  //     },
  //   })
  // ),
  on(
    fetchChatSuccessAction,
    (state, action): ChatInterface => ({
      ...state,
      friends: action.response.payload[0].friend,
    })
  ),
  on(
    pushAction,
    (state, action): ChatInterface => ({
      ...state,
      friends: {
        ...state.friends,
        [action.data.room]: [
          ...state.friends[action.data.room],
          {
            id: action.data.id,
            user: action.data.user,
            message: action.data.message,
          },
        ],
      },
    })
  )
);

export function chatReducers(state: ChatInterface, action: Action) {
  return chatReducer(state, action);
}
