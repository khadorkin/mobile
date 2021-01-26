import * as React from 'react';
import {View, StyleSheet, FlatList, ViewStyle} from 'react-native';
import kebabCase from 'lodash/fp/kebabCase';

import theme from '../modules/theme';
import type {Card as ContentCard} from '../layer/data/_types';
import Card from './card';
import CatalogItem, {
  WIDTH as CATALOG_ITEM_WIDTH,
  HEIGHT as CATALOG_ITEM_HEIGHT,
} from './catalog-item';

export const ITEM_OFFSET = theme.spacing.micro;
export const ITEM_WIDTH = CATALOG_ITEM_WIDTH + ITEM_OFFSET * 2;
export const ITEM_HEIGHT = CATALOG_ITEM_HEIGHT + ITEM_OFFSET * 2;

const styles = StyleSheet.create({
  item: {
    margin: theme.spacing.micro,
  },
  card: {
    width: CATALOG_ITEM_WIDTH,
    height: CATALOG_ITEM_HEIGHT,
  },
});

type EmptyCard = {};

export interface Props {
  cards?: Array<ContentCard | void>;
  onCardPress?: (item: ContentCard) => void;
  onScroll?: (arg0: ScrollEvent) => void;
  onScrollBeginDrag?: (arg0: ScrollEvent) => void;
  placeholderLength?: number;
  numColumns?: number;
  style?: ViewStyle;
  testID?: string;
  fitScreenWidth?: boolean;
  scale?: number;
}

class CatalogItems extends React.PureComponent<Props> {
  keyExtractor = (item: ContentCard | EmptyCard, index: number) => {
    const {testID = 'catalog-items'} = this.props;
    const suffix =
      // @ts-ignore union type
      (item && item.universalRef && kebabCase(item.universalRef)) || `${index}-placeholder`;

    return `${testID}-item-${suffix}`;
  };

  getItemLayout = (data?: Array<ContentCard | EmptyCard> | null, index: number) => {
    const {scale} = this.props;
    const itemScale = scale ? scale : 1;
    return {
      length: ITEM_WIDTH * itemScale,
      offset: ITEM_WIDTH * index * itemScale,
      index,
    };
  };

  renderItem = ({item, index}: {item: ContentCard | EmptyCard; index: number}) => {
    const {onCardPress, scale} = this.props;
    const testID = this.keyExtractor(item, index);
    const itemScale = scale ? scale : 1;
    const containerWidth = CATALOG_ITEM_WIDTH * itemScale;
    const containerHeight = CATALOG_ITEM_HEIGHT * itemScale;
    return (
      // itemScale !== 1 is necessary in order to rerender the component with style transform updated, ohterwise it seems to stay unchanged even if itemScale has changed
      <View style={styles.item}>
        <Card style={[styles.card, {width: containerWidth, height: containerHeight}]}>
          <View
            style={[
              {
                transform: [
                  {scale: itemScale + 0.02},
                  {translateX: -(CATALOG_ITEM_WIDTH - containerWidth) / 2 - 1}, // dirty but necessary to have a perfect fit
                  {translateY: -(CATALOG_ITEM_HEIGHT - containerHeight) / 2 - 3},
                ],
              },
            ]}
          >
            <CatalogItem
              // @ts-ignore union type
              item={item.universalRef ? item : undefined}
              onPress={onCardPress}
              testID={testID}
            />
          </View>
        </Card>
      </View>
    );
  };

  render() {
    const {
      cards,
      onScroll,
      onScrollBeginDrag,
      placeholderLength = 0,
      numColumns,
      style,
      testID = 'catalog-items',
    } = this.props;

    const _cards = cards && cards.length > 0 ? cards : new Array(placeholderLength).fill();
    return (
      <FlatList
        // Empty object to prevent filtering when using numColumns
        // https://github.com/facebook/react-native/blob/master/Libraries/Lists/FlatList.js#L495
        data={_cards.map((item) => item || {})}
        renderItem={this.renderItem}
        keyExtractor={this.keyExtractor}
        getItemLayout={this.getItemLayout}
        contentContainerStyle={style}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        onScrollBeginDrag={onScrollBeginDrag}
        onScroll={onScroll}
        scrollEnabled={Boolean(onScroll)}
        horizontal={!numColumns}
        numColumns={numColumns}
        key={`${testID}-${numColumns || '0'}`}
        testID={testID}
      />
    );
  }
}

export default CatalogItems;
