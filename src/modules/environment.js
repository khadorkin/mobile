// @flow strict

const {REACT_NATIVE_FLAVOR} = process.env;

export const __E2E__ = REACT_NATIVE_FLAVOR === 'E2E';
export const __STORYBOOK__ = REACT_NATIVE_FLAVOR === 'STORYBOOK';

const env = process.env;
export const __ENV__ = env.NODE_ENV;
export const __TEST__ = __ENV__ === 'test';
export const __DEV__ = __ENV__ === 'development';

export const DEV_TOKEN =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNWQ4MjRjNjJjNjBjOGQyYTk3ZDVjODYwIiwiZ3JhbnRzIjp7Im1vb2MiOnsiZ3JhbnRzIjp7ImRpZ2l0YWwiOnsicm9sZXMiOlsiYWRtaW4iLCJ1c2VyIiwicmgiLCJnb2Rtb2RlIiwiY21zIiwic3lzdGVtIl19fX19LCJob3N0IjoiaHR0cDovL2RpZ2l0YWwubW9vYzozMDAwIiwidXNhZ2UiOiJtb2JpbGUiLCJpYXQiOjE1Njg4MjAzNDEsImV4cCI6MTU5ODgyMDM0MSwiaXNzIjoiY29vcnBhY2FkZW15LWp3dCJ9.DHnqAL1dnbBXD3Btff3R9xlw3sjH_J19nkiMBIhU3lk';

export default {
  __E2E__,
  __STORYBOOK__,
  __ENV__,
  __TEST__,
  __DEV__,
  DEV_TOKEN
};
