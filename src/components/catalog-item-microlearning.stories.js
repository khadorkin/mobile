// @flow

import * as React from 'react';
import {storiesOf} from '@storybook/react-native';

import image from '../__fixtures__/assets/landscape-1.jpg';
import type {Progression} from '../types';
import {CARD_DISPLAY_MODE, AUTHOR_TYPE} from '../const';
import {handleFakePress} from '../utils/tests';
import translations from '../translations';
import CatalogItemMicrolearning from './catalog-item-microlearning';

const progression: Progression = {
  current: 3,
  count: 10
};

storiesOf('Catalog Item Microlearning', module)
  .add('Adaptive', () => (
    <CatalogItemMicrolearning
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
  .add('New', () => (
    <CatalogItemMicrolearning
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
  ))
  .add('Adaptive/New/Certified/Coorp', () => (
    <CatalogItemMicrolearning
      title="Predicting the future"
      subtitle="Coorpacademy"
      progression={progression}
      image={image}
      authorType={AUTHOR_TYPE.COORP}
      badge={translations.new}
      isAdaptive
      displayMode={CARD_DISPLAY_MODE.COVER}
      isCertified
      onPress={handleFakePress}
      testID="catalog3"
      universalRef="foobar"
      type="learner"
      section="finishLearning"
    />
  ))
  .add('Adaptive/New/Certified/Custom', () => (
    <CatalogItemMicrolearning
      title="Predicting the future"
      subtitle="Coorpacademy"
      progression={progression}
      image={image}
      authorType={AUTHOR_TYPE.VERIFIED}
      badge={translations.new}
      isAdaptive
      displayMode={CARD_DISPLAY_MODE.CARD}
      isCertified
      onPress={handleFakePress}
      testID="catalog4"
      universalRef="foobar"
      type="learner"
      section="finishLearning"
    />
  ));
