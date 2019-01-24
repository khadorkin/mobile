// @flow

import * as React from 'react';
import {View} from 'react-native';

type Props = {|
  children: React.Node
|};

const ResourceOverlay = ({children}: Props) => <View>{children}</View>;

export default ResourceOverlay;
