// @flow

import * as React from 'react';
import {storiesOf} from '@storybook/react-native';

import VideoPlayer from './video';

storiesOf('Video', module).add('Default', () => (
  <VideoPlayer
    testID="basic-text"
    source="https://alanlanglois.net/yob/yob_hurricane.mp4"
    preview="https://alanlanglois.net/yob/preview.png"
  />
));
