// @flow

import * as React from 'react';
import {storiesOf} from '@storybook/react-native';

import Video from './video';

const handleFullScreen = () => {};

storiesOf('Video', module)
  .add('Default', () => (
    <Video
      source="https://content.jwplatform.com/videos/Piqz1Sdy.mp4"
      preview="https://assets-jpcust.jwpsrv.com/thumbnails/2ad64hgq-720.jpg"
      isFullScreen={false}
      onFullScreen={handleFullScreen}
    />
  ))
  .add('Fullscreen', () => (
    <Video
      source="https://content.jwplatform.com/videos/Piqz1Sdy.mp4"
      preview="https://assets-jpcust.jwpsrv.com/thumbnails/2ad64hgq-720.jpg"
      isFullScreen
      onFullScreen={handleFullScreen}
    />
  ));
