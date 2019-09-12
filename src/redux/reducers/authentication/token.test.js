// @flow strict

import {createUser} from '../../../__fixtures__/user';
import {createToken} from '../../../__fixtures__/tokens';
import {SIGN_OUT, SIGN_IN_SUCCESS} from '../../actions/authentication';
import type {Action} from '../../actions/authentication';
import reducer from './token';
import type {State} from './token';

describe('Authentification', () => {
  const expectedInitialState: State = null;

  it('Default', () => {
    const action = {
      type: 'FAKE_ACTION'
    };
    // $FlowFixMe we are trying to emulate something else
    const result = reducer(undefined, action);
    expect(result).toEqual(expectedInitialState);
  });

  describe(SIGN_IN_SUCCESS, () => {
    it('Default', () => {
      const token = createToken({});
      const action: Action = {
        type: SIGN_IN_SUCCESS,
        payload: {
          token,
          user: createUser()
        }
      };

      const result = reducer(undefined, action);
      const expected: State = token;

      expect(result).toEqual(expected);
    });
  });
  describe(SIGN_OUT, () => {
    it('Default', () => {
      const action: Action = {type: SIGN_OUT};

      const result = reducer(undefined, action);
      const expected: State = expectedInitialState;

      expect(result).toEqual(expected);
    });
  });
});
