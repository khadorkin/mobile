// @flow strict

import type {Action} from '../../actions/brands';
import type {Action as AuthenticationAction} from '../../actions/authentication';
import {SIGN_OUT, SIGN_IN_SUCCESS} from '../../actions/authentication';

export type State = {|
  token: string | null,
  isGodModeUser: boolean,
  displayName: string,
  givenName: string,
  familyName: string
|} | null;

export const initialState: State = {
  token: null,
  isGodModeUser: false,
  displayName: '',
  familyName: '',
  givenName: ''
};

const reducer = (state: State = initialState, action: Action | AuthenticationAction): State => {
  switch (action.type) {
    case SIGN_IN_SUCCESS: {
      const {token, isGodModeUser, givenName, familyName, displayName} = action.payload;
      return {
        token,
        isGodModeUser,
        givenName,
        familyName,
        displayName
      };
    }
    case SIGN_OUT: {
      return initialState;
    }
    default:
      return state;
  }
};

export default reducer;
