// @flow strict

import {combineReducers} from 'redux';
import type {Reducer} from 'redux';
import type {Action} from '../../actions/authentication';
import type {Action as BrandAction} from '../../actions/brands';
import userReducer from './user';
import type {State as UserState} from './user';
import brandReducer from './brand';
import type {State as BrandState} from './brand';
import tokenReducer from './token';
import type {State as TokenState} from './token';

export type State = {|
  token: TokenState,
  user: UserState,
  brand: BrandState
|};

const reducers: Reducer<State, BrandAction | Action> = combineReducers({
  token: tokenReducer,
  brand: brandReducer,
  user: userReducer
});
export default reducers;
