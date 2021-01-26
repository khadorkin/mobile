import * as React from 'react';
import {storiesOf} from '@storybook/react-native';

import {createChapterCard, createExtCard} from '../__fixtures__/cards';
import {CARD_STATUS} from '../layer/data/_const';
import CatalogItemCover from './catalog-item-cover';

const chapterCard = createChapterCard({
  ref: 'bar',
  completion: 0.8,
  title: 'Chapter card',
  status: CARD_STATUS.ACTIVE,
  isNew: true,
  isAdaptive: true,
});
const scormCard = createExtCard({
  ref: 'bar',
  completion: 0.8,
  title: 'Scorm card',
  status: CARD_STATUS.ACTIVE,
  isNew: true,
  isAdaptive: true,
  type: 'scorm',
});

const scormCardWithoutImage = createExtCard({
  ref: 'bar',
  completion: 0.8,
  title: 'Scorm card',
  status: CARD_STATUS.ACTIVE,
  isNew: true,
  isAdaptive: true,
  image: null,
});

storiesOf('CatalogItemCover', module)
  .add('Default', () => (
    <CatalogItemCover item={chapterCard} size="hero" testID="catalog-item-cover" />
  ))
  .add('Default (cover)', () => (
    <CatalogItemCover item={chapterCard} size="cover" testID="catalog-item-cover" />
  ))
  .add('Scorm (with image)', () => (
    <CatalogItemCover item={scormCard} testID="catalog-item-cover" />
  ))
  .add('Scorm (without image)', () => (
    <CatalogItemCover item={scormCardWithoutImage} testID="catalog-item-cover" />
  ));
