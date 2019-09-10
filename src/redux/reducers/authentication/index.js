// @flow strict

import {combineReducers} from 'redux';
import type {Reducer} from 'redux';
import type {Action} from '../../actions/authentication';
import type {Action as BrandAction} from '../../actions/brands';
import userReducer from './user';
import type {State as UserState} from './user';
import brandReducer from './brand';
import type {State as BrandState} from './brand';

export type State = {|
  user: UserState,
  brand: BrandState
|};

const reducers: Reducer<State, BrandAction | Action> = combineReducers({
  brand: brandReducer,
  user: userReducer
});
export default reducers;
