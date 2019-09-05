// @flow

import * as React from 'react';

import {connect} from 'react-redux';
import type {User} from '../types';
import type {StoreState} from '../redux/store';

type ConnectedStateProps = User;

type Props = {|
  user: User,
  children: React.Node
|};

type State = User;

export const initialState: State = {
  familyName: '',
  givenName: '',
  displayName: ''
};

export const UserContext: React.Context<State> = React.createContext(initialState);

const UserProvider = ({children, user}: Props) => (
  <UserContext.Provider value={user}>{children}</UserContext.Provider>
);

export const mapStateToProps = (state: StoreState): ConnectedStateProps => {
  const user = state.authentication.user;

  if (!user) return initialState;

  return {familyName: user.familyName, givenName: user.givenName, displayName: user.displayName};
};

export {UserProvider as Component};
export default connect(mapStateToProps)(UserProvider);
