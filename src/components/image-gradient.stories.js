// @flow

import * as React from 'react';
import {storiesOf} from '@storybook/react-native';
import {View} from 'react-native';
import image from '../__fixtures__/assets/landscape-1.jpg';
import ImageGradient from './image-gradient';

storiesOf('Catalogue Item Author', module).add('Default', () => (
  <ImageGradient testID="image-gradient" image={image} minHeight={250}>
    <View />
  </ImageGradient>
));
