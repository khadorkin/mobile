// @flow

import * as React from 'react';
import {storiesOf} from '@storybook/react-native';

import image from '../__fixtures__/assets/landscape-1.jpg';
import type {Progression} from '../types';
import {DISPLAY_MODE} from '../const';
import {handleFakePress} from '../utils/tests';
import CatalogItem from './catalog-item';

const progression: Progression = {
  current: 3,
  count: 10
};

storiesOf('Catalogue Item', module)
  .add('Adaptive', () => (
    <CatalogItem
      title="Predicting the future"
      subtitle="Coorpacademy"
      progression={progression}
      image={image}
      authorType="COORP ORIGINAL"
      isInfinite
      onPress={handleFakePress}
    />
  ))
  .add('New', () => (
    <CatalogItem
      title="Predicting the future"
      subtitle="Coorpacademy"
      progression={progression}
      image={image}
      authorType="COORP ORIGINAL"
      badge="New"
      isInfinite={false}
      onPress={handleFakePress}
    />
  ))
  .add('Adaptive/New/Certified/Coorp', () => (
    <CatalogItem
      title="Predicting the future"
      subtitle="Coorpacademy"
      progression={progression}
      image={image}
      authorType="coorp"
      badge="New"
      isInfinite
      mode={DISPLAY_MODE.COVER}
      isCertified
      onPress={handleFakePress}
    />
  ))
  .add('Adaptive/New/Certified/Custom', () => (
    <CatalogItem
      title="Predicting the future"
      subtitle="Coorpacademy"
      progression={progression}
      image={image}
      authorType="CUSTOM EDITOR"
      badge="New"
      isInfinite
      mode={DISPLAY_MODE.CARD}
      isCertified
      onPress={handleFakePress}
    />
  ));
