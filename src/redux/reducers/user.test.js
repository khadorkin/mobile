// @flow strict

import reducer from './user';
import type {State} from './user';

describe('User', () => {
  const expectedInitialState: State = {
    host: 'https://mobile-staging.coorpacademy.com',
    token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNWM3NTFhYTY4ZjI3MTMwMDFiMzBlMWIzIiwiYnJhbmQiOiJtb2JpbGUiLCJob3N0IjoiaHR0cHM6Ly9tb2JpbGUtc3RhZ2luZy5jb29ycGFjYWRlbXkuY29tIiwiaWF0IjoxNTUxMTc4ODEwLCJleHAiOjIwMDAwMDAwMDAsImF1ZCI6Im1vYmlsZSIsImlzcyI6ImNvb3JwYWNhZGVteS1qd3QifQ.MRRlxll4lX5lel45679Nj-4IDGsVRwybxsUxbrl20Qs'
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
