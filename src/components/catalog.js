// @flow

import * as React from 'react';
import {View, StyleSheet} from 'react-native';

import type {Chapter, Discipline} from '../layer/data/_types';
import type {Progression, DisplayMode} from '../types';
import {DISPLAY_MODE} from '../const';
import {getCleanUri} from '../modules/uri';
import theme from '../modules/theme';
import translations from '../translations';
import Space from './space';
import Card from './card';
import CatalogItem from './catalog-item';
import {STYLE as BOX_STYLE} from './box';

export type Item = Discipline | Chapter;

type Props = {|
  items: Array<Item>,
  onPress: (item: Item) => void
|};

const styles = StyleSheet.create({
  card: {
    ...BOX_STYLE,
    borderRadius: theme.radius.card,
    borderBottomWidth: 1,
    borderColor: 'rgba(20, 23, 26, 0.15)'
  }
});

class Catalog extends React.PureComponent<Props> {
  props: Props;

  handlePress = (item: Item) => () => this.props.onPress(item);

  isChapter = (item: Item): boolean => !item.hasOwnProperty('modules');

  getImageURI(item: Item): string {
    let image;
    if (this.isChapter(item)) {
      image = item.poster && item.poster.mediaUrl;
    } else {
      image = item.cover && item.cover.media.mediaUrl;
    }
    if (image) return image;
    return '';
  }

  render() {
    const {items} = this.props;
    // @todo Replace progression with user data

    let displayMode: DisplayMode;
    let isInfinite: boolean;
    let isCertified: boolean;
    let isNew;
    let progression: Progression;
    return (
      <View testID="catalog">
        {items.map((item, index) => {
          // @todo Replace this with real data
          displayMode = index % 2 === 1 ? DISPLAY_MODE.CARD : DISPLAY_MODE.COVER;
          isInfinite = index % 2 === 1;
          isCertified = index % 3 === 1;
          isNew = index % 4 === 1 ? translations.new : '';
          progression = {current: Math.random() * 10, count: 10};
          return (
            <React.Fragment key={index}>
              {index > 0 && <Space />}
              <Card style={[styles.card]}>
                <CatalogItem
                  testID={`catalog-item-${item.universalRef.replace(/_/g, '-')}`}
                  onPress={this.handlePress(item)}
                  title={item.name}
                  subtitle="Coorpacademy"
                  progression={progression}
                  image={{uri: getCleanUri(this.getImageURI(item))}}
                  authorType={item.partnershipType && item.partnershipType}
                  badge={isNew}
                  isInfinite={isInfinite}
                  displayMode={displayMode}
                  isCertified={isCertified}
                />
              </Card>
              <Space />
            </React.Fragment>
          );
        })}
      </View>
    );
  }
}

export default Catalog;
