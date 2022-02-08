import { Action, createReducer, on } from '@ngrx/store';
import { UserInterface } from '../../types/user.interface';
import {
  addAction,
  addFailureAction,
  addSuccessAction,
  findAction,
  findFailureAction,
  findSuccessAction,
} from '../actions/find.action';
import {
  listAction,
  listFailureAction,
  listSuccessAction,
} from '../actions/list.action';
import {
  undoReceivedAction,
  undoReceivedFailureAction,
  undoReceivedSuccessAction,
} from '../actions/recieved.action';
import {
  acceptAction,
  acceptFailureAction,
  acceptSuccessAction,
  undoSentAction,
  undoSentFailureAction,
  undoSentSuccessAction,
} from '../actions/sent.action';
import {
  isLoggedinAction,
  isLoggedoutAction,
  userFetchAction,
  userFetchSuccessAction,
  userFetchFailureAction,
} from '../actions/user.action';

const initialState: UserInterface = {
  isLoggedIn: false,
  verification: false,
  user: {
    id: null,
    username: null,
    name: null,
    details: {
      friends: [],
      requestsSent: [],
      requestsRecieved: [],
      find: [],
    },
  },
};
const userReducer = createReducer(
  initialState,
  on(
    isLoggedinAction,
    (state, action): UserInterface => ({
      ...state,
      ...action.request,
    })
  ),
  on(
    isLoggedoutAction,
    (state, action): UserInterface => ({
      ...state,
      ...action.request,
    })
  ),
  on(
    userFetchAction,
    (state, action): UserInterface => ({
      ...state,
      verification: action.request.token,
      user: {
        ...state.user,
        username: action.request.username,
      },
    })
  ),
  on(
    userFetchSuccessAction,
    (state, action): UserInterface => ({
      ...state,
      verification: true,
      user: {
        ...state.user,
        ...action.response,
      },
    })
  ),

  on(
    findAction,
    (state): UserInterface => ({
      ...state,
      user: {
        ...state.user,
        details: {
          ...state.user.details,
          find: [],
        },
      },
    })
  ),
  on(
    findSuccessAction,
    (state, action): UserInterface => ({
      ...state,
      verification: true,
      user: {
        ...state.user,
        details: {
          ...state.user.details,
          find: action.response.payload[0].find,
        },
      },
    })
  ),
  on(
    findFailureAction,
    (state): UserInterface => ({
      ...state,
      user: {
        ...state.user,
        details: {
          ...state.user.details,
          find: [],
        },
      },
    })
  ),
  on(
    addAction,
    (state): UserInterface => ({
      ...state,
      user: {
        ...state.user,
        details: {
          ...state.user.details,
          find: [],
        },
      },
    })
  ),
  on(
    addSuccessAction,
    (state, action): UserInterface => ({
      ...state,
      verification: true,
      user: {
        ...state.user,
        details: {
          ...state.user.details,
          requestsSent: [
            ...state.user.details.requestsSent,
            action.response.payload[0].request,
          ],
        },
      },
    })
  ),

  on(
    undoSentSuccessAction,
    (state, action): UserInterface => ({
      ...state,
      verification: true,
      user: {
        ...state.user,
        details: {
          ...state.user.details,
          requestsSent: state.user.details.requestsSent.filter(
            (item) => item != action.response.payload[0].friend
          ),
        },
      },
    })
  ),

  on(
    undoReceivedSuccessAction,
    (state, action): UserInterface => ({
      ...state,
      verification: true,
      user: {
        ...state.user,
        details: {
          ...state.user.details,
          requestsRecieved: state.user.details.requestsRecieved.filter(
            (item) => item != action.response.payload[0].user
          ),
        },
      },
    })
  ),

  on(
    acceptSuccessAction,
    (state, action): UserInterface => ({
      ...state,
      verification: true,
      user: {
        ...state.user,
        details: {
          ...state.user.details,
          requestsRecieved: state.user.details.requestsRecieved.filter(
            (item) => item != action.response.payload[0].friend
          ),
          friends: [
            ...state.user.details.friends,
            action.response.payload[0].friend,
          ],
        },
      },
    })
  ),

  on(
    listSuccessAction,
    (state, action): UserInterface => ({
      ...state,
      verification: true,
      user: {
        ...state.user,
        details: {
          ...state.user.details,
          friends: state.user.details.friends.filter(
            (item) => item !== action.response.payload[0].friend
          ),
        },
      },
    })
  ),
  on(
    addFailureAction,
    userFetchFailureAction,
    undoSentAction,
    undoSentFailureAction,
    undoReceivedAction,
    listFailureAction,
    acceptFailureAction,
    listAction,
    undoReceivedFailureAction,
    acceptAction,
    (state): UserInterface => ({
      ...state,
    })
  )
);

export function userReducers(state: UserInterface, action: Action) {
  return userReducer(state, action);
}
