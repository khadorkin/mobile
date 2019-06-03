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
  line: {
    borderRadius: 0
  },
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
  color = theme.colors.gray.light,
  width = '100%'
}: Props) => (
  <LineBase style={[styles.line, styles[size], {backgroundColor: color}]} width={width} noMargin />
);

export default PlaceholderLine;
