// @flow

import * as React from 'react';
import {View, StyleSheet, FlatList} from 'react-native';

import theme from '../modules/theme';
import translations from '../translations';
import {getCleanUri} from '../modules/uri';
import type {DisciplineCard, ChapterCard} from '../layer/data/_types';
import {CARD_TYPE} from '../layer/data/_const';
import {CARD_DISPLAY_MODE, AUTHOR_TYPE, ENGINE} from '../const';
import withLayout from '../containers/with-layout';
import type {WithLayoutProps} from '../containers/with-layout';
import {BrandThemeContext} from './brand-theme-provider';
import {STYLE as BOX_STYLE} from './box';
import Card from './card';
import CatalogItem, {WIDTH as CATALOG_ITEM_WIDTH} from './catalog-item';
import CatalogItemPlaceholder from './catalog-item-placeholder';
import Placeholder from './placeholder';
import PlaceholderLine from './placeholder-line';
import Text from './text';

export type Props = {|
  ...WithLayoutProps,
  sectionRef: string,
  title?: string,
  cards?: Array<DisciplineCard | ChapterCard | void>,
  onCardPress: (DisciplineCard | ChapterCard) => void,
  onScroll?: ScrollEvent => void
|};

const ITEM_HORIZONTAL_OFFSET = theme.spacing.tiny;
export const ITEM_WIDTH = CATALOG_ITEM_WIDTH + ITEM_HORIZONTAL_OFFSET * 2;

const styles = StyleSheet.create({
  title: {
    paddingHorizontal: theme.spacing.small,
    fontSize: theme.fontSize.large,
    fontWeight: theme.fontWeight.bold
  },
  list: {
    paddingHorizontal: theme.spacing.tiny
  },
  card: {
    flex: 1,
    borderRadius: theme.radius.card,
    // to see the shadow
    marginHorizontal: ITEM_HORIZONTAL_OFFSET,
    marginVertical: theme.spacing.small
  }
});

class CatalogSection extends React.PureComponent<Props> {
  props: Props;

  offsetX: number = 0;

  keyExtractor = (item: DisciplineCard | ChapterCard | void, index: number) =>
    `catalog-item-${(item && item.universalRef) || index}-placeholder`;

  handleItemPress = (item: DisciplineCard | ChapterCard) => () => this.props.onCardPress(item);

  renderItem = ({item, index}: {item: DisciplineCard | ChapterCard | void, index: number}) => {
    if (!item) {
      return (
        <Card style={styles.card} shadowStyle={BOX_STYLE}>
          <CatalogItemPlaceholder testID={`catalog-item-placeholder-${index + 1}`} />
        </Card>
      );
    }

    const author = item.authors && item.authors[0];

    return (
      <Card style={styles.card} shadowStyle={BOX_STYLE}>
        <BrandThemeContext.Consumer>
          {brandTheme => (
            <CatalogItem
              title={item.title}
              subtitle={item.authors && item.authors.map(({label}) => label).join(', ')}
              progression={{
                current: item.completion,
                count: 1
              }}
              image={{uri: getCleanUri(item.image)}}
              authorType={author && author.authorType}
              authorName={
                author && author.authorType === AUTHOR_TYPE.CUSTOM ? brandTheme.name : author.label
              }
              badge={item.isNew ? translations.new : ''}
              isAdaptive={item.adaptiv || false}
              displayMode={CARD_DISPLAY_MODE.CARD}
              onPress={this.handleItemPress(item)}
              testID={`catalog-item-${item.universalRef.replace(/_/g, '-')}`}
              isCertified={author && author.authorType === AUTHOR_TYPE.VERIFIED}
              universalRef={item.universalRef}
              type={item.type === CARD_TYPE.CHAPTER ? ENGINE.MICROLEARNING : ENGINE.LEARNER}
              section={this.props.sectionRef}
            />
          )}
        </BrandThemeContext.Consumer>
      </Card>
    );
  };

  renderTitle = (): React.Node => {
    const {title} = this.props;

    if (!title) {
      return (
        <View style={styles.title}>
          <Placeholder>
            <PlaceholderLine width="30%" />
          </Placeholder>
        </View>
      );
    }

    return <Text style={styles.title}>{title}</Text>;
  };

  render() {
    const {sectionRef, cards, onScroll} = this.props;

    return (
      <View>
        {this.renderTitle()}
        <FlatList
          data={cards}
          renderItem={this.renderItem}
          keyExtractor={this.keyExtractor}
          contentContainerStyle={styles.list}
          showsHorizontalScrollIndicator={false}
          onScroll={onScroll}
          horizontal
          testID={`catalog-section-${sectionRef}-items`}
        />
      </View>
    );
  }
}

export {CatalogSection as Component};
export default withLayout(CatalogSection);
