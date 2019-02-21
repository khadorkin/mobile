// @flow

import * as React from 'react';
import {View, StyleSheet, Text, Image} from 'react-native';
import type {Chapter, Discipline} from '../layer/data/_types';
import type {Progression} from '../types';
import {getCleanUri} from '../modules/uri';
import {DISPLAY_MODE} from '../const';
import theme from '../modules/theme';
import CatalogItem from './catalog-item';
import Card from './card';
import {BrandThemeContext} from './brand-theme-provider';
import Space from './space';

export type Item = Discipline | Chapter;

type Props = {|
  titleCover: string,
  titleCards: string,
  logo: File | {uri: string},
  items: Array<Item>,
  onPress: (item: Item) => void
|};

const styles = StyleSheet.create({
  container: {
    margin: theme.spacing.small
  },
  logo: {
    height: 36,
    width: '100%',
    resizeMode: 'contain'
  },
  title: {
    fontSize: 16,
    fontWeight: theme.fontWeight.bold,
    paddingBottom: theme.spacing.small,
    paddingTop: theme.spacing.base
  },
  cards: {
    flexDirection: 'row',
    alignItems: 'stretch'
  },
  card: {
    flex: 1
  },
  footer: {
    position: 'absolute',
    bottom: '-60%',
    backgroundColor: '#222',
    height: '100%',
    width: '100%',
    borderTopLeftRadius: 300,
    borderTopRightRadius: 300,
    transform: [{scaleX: 2}]
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
    const {items, titleCover, titleCards, logo} = this.props;

    // @todo Replace progression with user data
    const progression: Progression = {
      current: 3,
      count: 10
    };

    let nextItem: Item;
    let rowIndex: number = -1;

    const cover: Item = items.splice(0, 1)[0];

    return (
      <View>
        <BrandThemeContext.Consumer>
          {brandTheme => (
            <View style={[styles.footer, {backgroundColor: brandTheme.colors.primary}]} />
          )}
        </BrandThemeContext.Consumer>
        <View style={styles.container}>
          <Image
            style={styles.logo}
            source={{
              uri: 'https://www.totec.travel/wp-content/uploads/2018/07/cooropacademy.png'
            }}
          />
          <Text style={styles.title}>{titleCover}</Text>

          <Card style={styles.card} hasShadow>
            <CatalogItem
              title={cover.name}
              subtitle="eee"
              progression={progression}
              image={{uri: getCleanUri(this.getImageURI(cover))}}
              authorType="CUSTOM EDITOR"
              badge="New"
              isInfinite
              mode={DISPLAY_MODE.COVER}
              isCertified
            />
          </Card>
          <Text style={styles.title}>{titleCards}</Text>
          {items.map((item, index) => {
            nextItem = items[index + 1];

            if (index % 2 === 1) {
              return null;
            }
            rowIndex++;
            return (
              <View key={`question-choice-row-${rowIndex}`}>
                {index > 0 && <Space />}
                <View style={styles.cards}>
                  <Card style={styles.card} hasShadow>
                    <CatalogItem
                      title={item.name}
                      subtitle="eee"
                      progression={progression}
                      image={{uri: getCleanUri(this.getImageURI(item))}}
                      authorType="CUSTOM EDITOR"
                      badge="New"
                      isInfinite
                      mode={DISPLAY_MODE.CARD}
                      isCertified
                    />
                  </Card>
                  <Space />
                  {nextItem && (
                    <Card style={styles.card} hasShadow>
                      <CatalogItem
                        title={nextItem.name}
                        subtitle="eee"
                        progression={progression}
                        image={{uri: getCleanUri(this.getImageURI(nextItem))}}
                        authorType="CUSTOM EDITOR"
                        badge="New"
                        isInfinite
                        mode={DISPLAY_MODE.CARD}
                        isCertified
                      />
                    </Card>
                  )}
                  {!nextItem && <View style={styles.card} />}
                </View>
              </View>
            );
          })}
        </View>
      </View>
    );
  }
}

export default Catalog;
