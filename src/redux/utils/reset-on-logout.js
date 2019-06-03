// @flow strict

import type {Reducer} from 'redux';

import {SIGN_OUT} from '../actions/authentication';
import type {StoreAction} from '../_types';

const resetOnLogout = <S, A: StoreAction<*>>(reducer: Reducer<S, A>): Reducer<S, A> => (
  state,
  action
) => {
  switch (action.type) {
    case SIGN_OUT: {
      return reducer(undefined, action);
    }
    default: {
      return reducer(state, action);
    }
  }
};

export {SIGN_OUT};
export default resetOnLogout;
