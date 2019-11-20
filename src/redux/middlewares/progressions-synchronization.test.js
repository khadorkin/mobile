// @flow strict
import {PROGRESSION_CREATE_SUCCESS} from '@coorpacademy/player-store';
import {NAVIGATION_SCREEN_CHANGE} from '../actions/navigation';
import {createBrand} from '../../__fixtures__/brands';
import {createAuthenticationState} from '../../__fixtures__/store';
import type {Options} from '../_types';
import {sleep} from '../../utils/tests';
import {synchronizeProgressions} from '../actions/progressions/synchronize';
import {FETCH_SUCCESS as FETCH_SECTIONS_SUCCESS} from '../actions/catalog/sections';
import createMiddleware from './progressions-synchronization';

const brand = createBrand();
const createStore = () => ({
  getState: jest.fn(),
  dispatch: jest.fn()
});

type ReduxTestAction = {
  type: string,
  payload?: {
    currentScreenName: string
  }
};

describe("Progression's synchronization middleware", () => {
  const options: Options = {
    // $FlowFixMe we dont want to mock the entire services object
    services: {
      Progression: {}
    }
  };

  it('shoud not handle unsupported action', () => {
    const action = {
      type: 'FOO'
    };
    const middleware = createMiddleware(options);
    const store = createStore();
    const next = jest.fn();

    store.getState.mockImplementation(() => ({
      authentication: createAuthenticationState({token: 'FAKE_TOKEN', brand})
    }));
    // $FlowFixMe this si to test only
    middleware(store)(next)(action);
    expect(store.dispatch).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalledWith(action);
  });

  const testRunner = (action: ReduxTestAction) => {
    it(`should dispatch syncrhonizeProgression ${action.type}`, async () => {
      const middleware = createMiddleware(options);
      const store = createStore();
      store.getState.mockImplementation(() => ({
        authentication: createAuthenticationState({token: 'FAKE_TOKEN', brand})
      }));
      const next = jest.fn();
      // $FlowFixMe this si to test only
      middleware(store)(next)(action);
      await sleep();

      const expectedAction = synchronizeProgressions;
      expect(store.dispatch).toHaveBeenCalledWith(expectedAction);
      expect(next).toHaveBeenCalledWith(action);
    });
  };

  [
    {
      type: NAVIGATION_SCREEN_CHANGE,
      payload: {
        currentScreenName: 'Home'
      }
    },
    {
      type: PROGRESSION_CREATE_SUCCESS
    },
    {
      type: FETCH_SECTIONS_SUCCESS
    }
  ].forEach(testRunner);
});
