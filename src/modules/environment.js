// @flow strict

const {REACT_NATIVE_FLAVOR} = process.env;

export const __E2E__ = REACT_NATIVE_FLAVOR === 'E2E';
export const __STORYBOOK__ = REACT_NATIVE_FLAVOR === 'STORYBOOK';

const env = process.env;
export const __ENV__ = env.NODE_ENV;
export const __TEST__ = __ENV__ === 'test';
export const __DEV__ = __ENV__ === 'development';

export const DEV_TOKEN =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNWIyYTE2NWE0MTZjNmUwMTdlZGQ3NGM0IiwiZ3JhbnRzIjp7Im1vb2MiOnsiZ3JhbnRzIjp7Im9uYm9hcmRpbmciOnsicm9sZXMiOlsiYWRtaW4iLCJjb2FjaCIsInVzZXIiLCJyaCIsImdvZG1vZGUiLCJjbXMiLCJzeXN0ZW0iXX19fX0sImhvc3QiOiJodHRwczovL29uYm9hcmRpbmcuY29vcnBhY2FkZW15LmNvbSIsInVzYWdlIjoibW9iaWxlIiwiaWF0IjoxNTYyNTc3Mjc0LCJleHAiOjE1OTI1NzcyNzQsImlzcyI6ImNvb3JwYWNhZGVteS1qd3QifQ.mdXclZ8VG3eODNCjptIP776ZKetS4XhIcQFkeFCtZz4';

export default {
  __E2E__,
  __STORYBOOK__,
  __ENV__,
  __TEST__,
  __DEV__,
  DEV_TOKEN
};
