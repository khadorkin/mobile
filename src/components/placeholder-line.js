// @flow

import * as React from 'react';
import {StyleSheet} from 'react-native';
import {Line as LineBase} from 'rn-placeholder';

import theme from '../modules/theme';

type Props = {|
  size?: 'tiny' | 'small' | 'base',
  color?: string,
  width?: string
|};

const styles = StyleSheet.create({
  base: {
    height: 10
  },
  small: {
    height: 5
  },
  tiny: {
    height: 2
  }
});

const PlaceholderLine = ({
  size = 'base',
  color = theme.colors.gray.lightMedium,
  width = '100%'
}: Props) => <LineBase style={[styles[size], {backgroundColor: color}]} width={width} />;

export default PlaceholderLine;
