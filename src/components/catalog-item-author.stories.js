// @flow

import * as React from 'react';
import {storiesOf} from '@storybook/react-native';

import CatalogItemAuthor from './catalog-item-author';

storiesOf('Catalogue Item Author', module).add('Default', () => (
  <CatalogItemAuthor authorType="coorp" fontSize={12} testID="catalog-author" />
));
