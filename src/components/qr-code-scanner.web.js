// @flow

import * as React from 'react';
import {Animated, StyleSheet, View} from 'react-native';

export type Props = {|
  hasPermission: boolean,
  onScan: (token?: string) => void
|};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black'
  },
  camera: {
    width: '100%',
    height: '100%'
  }
});

// @todo web
const QRCodeScanner = ({hasPermission, onScan}: Props) => (
  <Animated.View style={[styles.container, styles.camera]} testID="qr-code-scanner">
    {hasPermission && <View />}
  </Animated.View>
);

export default QRCodeScanner;
