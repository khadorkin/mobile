// @flow

import * as React from 'react';
import {storiesOf} from '@storybook/react-native';
import image from '../__fixtures__/image-landscape-3.jpg';

import Preview from './preview';

// eslint-disable-next-line no-console
const handleButtonPress = () => console.log('Clicked');

storiesOf('Preview', module)
  .add('Video Remote', () => (
    <Preview type="video" source={image} onButtonPress={handleButtonPress} />
  ))
  .add('PDF Remote', () => (
    <Preview
      type="pdf"
      source={{uri: 'https://assets-jpcust.jwpsrv.com/thumbnails/2ad64hgq-720.jpg'}}
      onButtonPress={handleButtonPress}
    />
  ));
