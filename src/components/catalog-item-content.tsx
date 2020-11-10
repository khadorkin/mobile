import * as React from 'react';
import {StyleSheet, View} from 'react-native';

import {isExternalContent} from '../utils';
import type {Card} from '../layer/data/_types';
import {getAuthor} from '../utils/content';
import theme from '../modules/theme';
import CatalogItemFooter from './catalog-item-footer';
import CatalogItemAuthor from './catalog-item-author';

interface Props {
  item?: Card;
  size?: 'cover' | 'hero';
  testID?: string;
}

const styles = StyleSheet.create({
  authorScorm: {
    position: 'absolute',
    alignSelf: 'center',
    top: theme.spacing.tiny,
  },
});

const CatalogItemContent = ({item, size, testID = 'catalog-item-content'}: Props) => {
  const author = item && getAuthor(item);
  const isExternal = isExternalContent(item);
  return (
    <React.Fragment>
      {author ? (
        <View style={isExternal ? styles.authorScorm : null}>
          <CatalogItemAuthor
            type={author.authorType}
            name={author.label}
            size={size}
            testID={`${testID}-author`}
          />
        </View>
      ) : null}
      <CatalogItemFooter item={item} size={size} testID={`${testID}-footer`} />
    </React.Fragment>
  );
};

export default CatalogItemContent;
