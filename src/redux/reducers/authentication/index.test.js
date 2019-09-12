// @flow strict

import type {State} from '.';
import reducer from '.';

describe('Authentification', () => {
  const expectedInitialState: State = {
    token: null,
    user: null,
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
