// @flow strict

import * as React from 'react';
import {StyleSheet} from 'react-native';
import {Document} from 'react-pdf';

import theme from '../modules/theme';

type Props = {|
  source: {uri: string}
|};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.gray.light
  }
});

const Pdf = ({source}: Props) => (
  <View style={styles.container}>
    <Document file={source.uri} />
  </View>
);

export default Pdf;
