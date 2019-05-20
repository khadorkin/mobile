// @flow strict

type Orientation = {|
  lockToPortrait: () => void,
  unlockAllOrientations: () => void
|};

const orientation: Orientation = {
  // eslint-disable-next-line no-console
  lockToPortrait: () => console.warn('Not implemented in web'),
  // eslint-disable-next-line no-console
  unlockAllOrientations: () => console.warn('Not implemented in web')
};

export default orientation;
