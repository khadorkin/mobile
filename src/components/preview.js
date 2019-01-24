// @flow

import * as React from 'react';
import {TouchableOpacity, Text} from 'react-native';

// @todo remove
type ResourceType = 'video' | 'pdf';

type Props = {|
  type: ResourceType,
  source: File | {uri: string},
  onButtonPress: () => void
|};

const Preview = ({onButtonPress}: Props) => (
  <TouchableOpacity onPress={onButtonPress}>
    <Text style={{color: '#fff'}}>@todo preview</Text>
  </TouchableOpacity>
);

export default Preview;
