// @flow strict

const {REACT_NATIVE_FLAVOR} = process.env;

export const __E2E__ = REACT_NATIVE_FLAVOR === 'E2E';
export const __STORYBOOK__ = REACT_NATIVE_FLAVOR === 'STORYBOOK';

const env = process.env;
export const __ENV__ = env.NODE_ENV;
export const __TEST__ = __ENV__ === 'test';
export const __DEV__ = __ENV__ === 'development';

export const DEV_TOKEN =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNWQ4MjNlOTBkNDA1OTEwMDcwYjEzYjkzIiwiZ3JhbnRzIjp7Im1vb2MiOnsiZ3JhbnRzIjp7InRlc3Rzb2JpYSI6eyJyb2xlcyI6WyJhZG1pbiIsInVzZXIiLCJyaCIsImdvZG1vZGUiLCJjbXMiLCJzeXN0ZW0iXX19fX0sImhvc3QiOiJodHRwczovL3Rlc3Rzb2JpYS5jb29ycGFjYWRlbXkuY29tIiwidXNhZ2UiOiJtb2JpbGUiLCJpYXQiOjE1Njg4MTY3OTQsImV4cCI6MTU5ODgxNjc5NCwiaXNzIjoiY29vcnBhY2FkZW15LWp3dCJ9.38tYuk_VM_o37pZpLHF3tOSg4m0HcoMr9hgCP-KAC2c';

export default {
  __E2E__,
  __STORYBOOK__,
  __ENV__,
  __TEST__,
  __DEV__,
  DEV_TOKEN
};
