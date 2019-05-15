// @flow

import * as React from 'react';
import {storiesOf} from '@storybook/react-native';

import image from '../__fixtures__/assets/landscape-1.jpg';
import type {Progression} from '../types';
import {AUTHOR_TYPE} from '../const';
import {handleFakePress} from '../utils/tests';
import translations from '../translations';
import CatalogItem from './catalog-item';

const progression: Progression = {
  current: 3,
  count: 10
};

storiesOf('Catalog Item', module)
  .add('Learner', () => (
    <CatalogItem
      isCourse
      title="Predicting the future"
      subtitle="Coorpacademy"
      progression={progression}
      image={image}
      authorType={AUTHOR_TYPE.CUSTOM}
      authorName="BREGUET CREATION"
      isAdaptive
      onPress={handleFakePress}
      testID="catalog1"
      universalRef="foobar"
      type="learner"
      section="finishLearning"
    />
  ))
  .add('Microlearning', () => (
    <CatalogItem
      isCourse={false}
      title="Predicting the future"
      subtitle="Coorpacademy"
      progression={progression}
      image={image}
      authorType={AUTHOR_TYPE.CUSTOM}
      authorName="BREGUET CREATION"
      badge={translations.new}
      isAdaptive={false}
      onPress={handleFakePress}
      testID="catalog2"
      universalRef="foobar"
      type="learner"
      section="finishLearning"
    />
  ));
