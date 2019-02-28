// @flow strict

export type State = {|
  host?: string,
  token?: string
|};

export const initialState: State = {
  // host: 'https://onboarding.coorpacademy.com',
  host: 'https://mobile-staging.coorpacademy.com',
  token:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNWM3NTFhYTY4ZjI3MTMwMDFiMzBlMWIzIiwiYnJhbmQiOiJtb2JpbGUiLCJob3N0IjoiaHR0cHM6Ly9tb2JpbGUtc3RhZ2luZy5jb29ycGFjYWRlbXkuY29tIiwiaWF0IjoxNTUxMTc4ODEwLCJleHAiOjIwMDAwMDAwMDAsImF1ZCI6Im1vYmlsZSIsImlzcyI6ImNvb3JwYWNhZGVteS1qd3QifQ.MRRlxll4lX5lel45679Nj-4IDGsVRwybxsUxbrl20Qs'
};

const reducer = (state: State = initialState): State => state;

export default reducer;
