// @flow

import * as React from 'react';
import {View} from 'react-native';

import Gradient from './gradient';

export type Props = {|
  children: React.Node,
  color: string,
  height: number
|};

const CardFooterOverlay = ({children, color, height}: Props) => {
  const gradientStyle = {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: height
  };
  return (
    <View>
      {children}
      <View style={gradientStyle}>
        <Gradient height={height} color={color} />
      </View>
    </View>
  );
};

export default CardFooterOverlay;
