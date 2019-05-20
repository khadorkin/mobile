// @flow

import _orientation from 'react-native-orientation-locker';

type Orientation = {|
  lockToPortrait: typeof _orientation.lockToPortrait,
  unlockAllOrientations: typeof _orientation.unlockAllOrientations
|};

const orientation: Orientation = {
  lockToPortrait: _orientation.lockToPortrait,
  unlockAllOrientations: _orientation.unlockAllOrientations
};

export default orientation;
