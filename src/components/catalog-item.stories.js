// @flow

import * as React from 'react';
import {storiesOf} from '@storybook/react-native';

import image from '../__fixtures__/image-landscape-1.jpg';
import type {Progression} from '../types';
import {DISPLAY_MODE} from '../const';
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
  .add('Adaptive/New/Certified/Coorp', () => (
    <Item
      title="Predicting the future"
      subtitle="Coorpacademy"
      progression={progression}
      image={image}
      editor="coorp"
      badge="New"
      isInfinite
      mode={DISPLAY_MODE.COVER}
      isCertified
    />
  ))
  .add('Adaptive/New/Certified/Custom', () => (
    <Item
      title="Predicting the future"
      subtitle="Coorpacademy"
      progression={progression}
      image={image}
      editor="CUSTOM EDITOR"
      badge="New"
      isInfinite
      mode={DISPLAY_MODE.CARD}
      isCertified
    />
  ));
