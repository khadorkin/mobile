// @flow

import * as React from 'react';
import {View} from 'react-native';

import theme from '../modules/theme';
import Gradient from './gradient';

export type Props = {|
  children: React.Node,
  color?: string,
  height?: number
|};

const CardFooterOverlay = ({children, color, height}: Props) => {
  const gradientStyle = {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: height
  };

  const overlayColor = color ? color : theme.colors.white;
  const overlayHeight = height ? height : theme.spacing.large;

  return (
    <View>
      {children}
      <View style={gradientStyle}>
        <Gradient height={overlayHeight} color={overlayColor} />
      </View>
    </View>
  );
};

export default CardFooterOverlay;
