// @flow strict

// @todo to be enhanced, incomplete object
export const createNavigation = <T>({
  params
}: {
  params?: T
}): ReactNavigation$ScreenPropsWithParams<T> => ({
  state: {
    params
  },
  navigate: jest.fn(),
  goBack: jest.fn(),
  dispatch: jest.fn(),
  getParam: jest.fn(() => 'Mock$ReactNavigation$GetParam'),
  popToTop: jest.fn()
});
