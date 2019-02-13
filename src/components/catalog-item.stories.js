// @flow

import * as React from 'react';
import {storiesOf} from '@storybook/react-native';

import image from '../__fixtures__/image-landscape-1.jpg';
import type {Progression} from '../types';
import Item from './catalog-item';

const progression: Progression = {
  current: 3,
  count: 10
};

storiesOf('Catalogue Item', module)
  .add('Adaptive', () => (
    <Item
      title="Predicting the future"
      subtitle="Coorpacademy"
      progression={progression}
      image={image}
      editor="COORP ORIGINAL"
      isNew={false}
      isInfinite
    />
  ))
  .add('New', () => (
    <Item
      title="Predicting the future"
      subtitle="Coorpacademy"
      progression={progression}
      image={image}
      editor="COORP ORIGINAL"
      isNew
      isInfinite={false}
    />
  ))
  .add('Adaptive and New', () => (
    <Item
      title="Predicting the future"
      subtitle="Coorpacademy"
      progression={progression}
      image={image}
      editor="COORP ORIGINAL"
      isNew
      isInfinite
      titleFontSize={22}
      subtitleFontSize={16}
      progressionBarHeight={3}
    />
  ));
