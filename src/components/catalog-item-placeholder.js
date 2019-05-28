// @flow strict

import * as React from 'react';
import {View, StyleSheet} from 'react-native';

import theme from '../modules/theme';
import {SPACE} from '../const';
import {HEIGHT as CATALOG_ITEM_HEIGHT} from './catalog-item';
import Space from './space';
import Placeholder from './placeholder';
import PlaceholderLine from './placeholder-line';

type Props = {||};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.gray.light,
    padding: theme.spacing.small,
    height: CATALOG_ITEM_HEIGHT
  },
  emptySpace: {
    // @todo remove this, its really dangerous
    height: '48%'
  }
});

const CatalogItemPlaceholder = (props: Props) => (
  <Placeholder isAnimated>
    <View style={styles.container}>
      <View style={styles.emptySpace} />
      <PlaceholderLine width="70%" />
      <PlaceholderLine width="80%" />
      <Space type={SPACE.BASE} />
      <PlaceholderLine size="small" width="40%" />
      <PlaceholderLine size="tiny" width="100%" />
    </View>
  </Placeholder>
);

export default CatalogItemPlaceholder;
