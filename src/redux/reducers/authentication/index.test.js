// @flow strict

import {initialState as userInitialState} from './user';
import type {State} from '.';
import reducer from '.';

describe('Authentification', () => {
  const expectedInitialState: State = {
    user: userInitialState,
    brand: null
  };

  it('Default', () => {
    const action = {
      type: 'FAKE_ACTION'
    };
    // $FlowFixMe we are trying to emulate something else
    const result = reducer(undefined, action);
    expect(result).toEqual(expectedInitialState);
  });
});
