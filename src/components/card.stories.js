// @flow

import * as React from 'react';
import {Text} from 'react-native';
import {storiesOf} from '@storybook/react-native';
import {CARD_TYPE, DISPLAY_MODE} from '../const';
import image from '../__fixtures__/assets/landscape-1.jpg';
import type {Progression} from '../types';

import {handleFakePress} from '../utils/tests';
import Card from './card';
import CardHeader from './card-header';
import CatalogItem from './catalog-item';

const progression: Progression = {
  current: 3,
  count: 10
};

storiesOf('Card', module)
  .add('Tip', () => (
    <Card>
      <CardHeader type={CARD_TYPE.TIP} title="Foo bar baz" />
      <Text>A sponsored post is a small advertising insert appearing in users’ timelines.</Text>
    </Card>
  ))
  .add('Key point', () => (
    <Card>
      <CardHeader type={CARD_TYPE.KEY_POINT} title="Foo bar baz" />
      <Text>A sponsored post is a small advertising insert appearing in users’ timelines.</Text>
    </Card>
  ))
  .add('Correction', () => (
    <Card>
      <CardHeader type={CARD_TYPE.CORRECTION} title="Foo bar baz" />
      <Text>A sponsored post is a small advertising insert appearing in users’ timelines.</Text>
    </Card>
  ))
  .add('Catalog Item Cover', () => (
    <Card>
      <CatalogItem
        title="Predicting the future"
        subtitle="Coorpacademy"
        progression={progression}
        image={image}
        authorType="CUSTOM EDITOR"
        badge="New"
        isInfinite
        displayMode={DISPLAY_MODE.COVER}
        isCertified
        onPress={handleFakePress}
      />
    </Card>
  ))
  .add('Catalog Item Card', () => (
    <Card>
      <CatalogItem
        title="Predicting the future"
        subtitle="Coorpacademy"
        progression={progression}
        image={image}
        authorType="CUSTOM EDITOR"
        badge="New"
        isInfinite
        displayMode={DISPLAY_MODE.CARD}
        isCertified
        onPress={handleFakePress}
      />
    </Card>
  ));
