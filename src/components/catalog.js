// @flow

import * as React from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';

import type {ViewStyleProp} from 'react-native/Libraries/StyleSheet/StyleSheet';
import type {Chapter, Discipline} from '../layer/data/_types';
import type {Progression, DisplayMode} from '../types';
import {getCleanUri} from '../modules/uri';
import {DISPLAY_MODE} from '../const';
import theme from '../modules/theme';
import CatalogItem from './catalog-item';
import Card from './card';
import {BrandThemeContext} from './brand-theme-provider';

export type Item = Discipline | Chapter;

type Props = {|
  items: Array<Item>,
  onPress: (item: Item) => void
|};

let w: number = Dimensions.get('window').width - theme.spacing.small * 2;
let columnW: number = (w - theme.spacing.tiny) / 2;

const styles = StyleSheet.create({
  container: {
    width: w,
    flexDirection: 'row',
    flexWrap: 'wrap',
    margin: theme.spacing.small,
    justifyContent: 'space-between'
  },
  cover: {
    width: '100%',
    marginBottom: theme.spacing.base
  },
  card: {
    marginTop: theme.spacing.tiny,
    width: columnW
  },
  footer: {
    position: 'absolute',
    bottom: '-55%',
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

  render() {
    const {items} = this.props;

    // @todo Replace progression with user data
    const progression: Progression = {
      current: 3,
      count: 10
    };

    let image: string;
    let cardStyle: ViewStyleProp;
    let displayMode: DisplayMode;

    return (
      <View>
        <BrandThemeContext.Consumer>
          {brandTheme => (
            <View style={[styles.footer, {backgroundColor: brandTheme.colors.primary}]} />
          )}
        </BrandThemeContext.Consumer>
        <View testID="catalog" style={styles.container}>
          {items.map((item, index) => {
            if (this.isChapter(item)) {
              // $FlowFixMe this is a chapter
              image = item.poster.mediaUrl;
            } else {
              // $FlowFixMe this is a discipline
              image = item.cover.media.mediaUrl;
            }

            if (index === 0) {
              displayMode = DISPLAY_MODE.COVER;
              cardStyle = styles.cover;
            } else {
              displayMode = DISPLAY_MODE.CARD;
              cardStyle = styles.card;
            }

            return (
              <Card key={index} style={cardStyle} hasShadow>
                <CatalogItem
                  title={item.name}
                  subtitle="eee"
                  progression={progression}
                  image={{
                    uri: getCleanUri(image)
                  }}
                  authorType="CUSTOM EDITOR"
                  badge="New"
                  isInfinite
                  mode={displayMode}
                  isCertified
                />
              </Card>
            );
          })}
        </View>
      </View>
    );
  }
}

export default Catalog;
