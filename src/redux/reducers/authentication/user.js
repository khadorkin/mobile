// @flow strict

import type {Action} from '../../actions/authentication';
import {SIGN_OUT, SIGN_IN_SUCCESS} from '../../actions/authentication';
import type {User} from '../../../types';

export type State = User | null;

const initialState: State = null;

const reducer = (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case SIGN_IN_SUCCESS: {
      return action.payload.user;
    }
    case SIGN_OUT: {
      return initialState;
    }
    default:
      return state;
  }
};

export default reducer;
