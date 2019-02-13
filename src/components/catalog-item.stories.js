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
      authorType="COORP ORIGINAL"
      isInfinite
    />
  ))
  .add('New', () => (
    <Item
      title="Predicting the future"
      subtitle="Coorpacademy"
      progression={progression}
      image={image}
      authorType="COORP ORIGINAL"
      badge="New"
      isInfinite={false}
    />
  ))
  .add('Adaptive/New/Certified', () => (
    <Item
      title="Predicting the future"
      subtitle="Coorpacademy"
      progression={progression}
      image={image}
      editor="verified"
      badge="New"
      isInfinite
      editorFontSize={12}
      titleFontSize={22}
      subtitleFontSize={16}
      progressionBarHeight={3}
      isCertified
    />
  ));
