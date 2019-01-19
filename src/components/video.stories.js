// @flow

import * as React from 'react';
import {storiesOf} from '@storybook/react-native';

import Video from './video';

storiesOf('Video', module).add('Default', () => (
  <Video
    testID="basic-video"
    source="https://alanlanglois.net/yob/yob_hurricane.mp4"
    preview="https://alanlanglois.net/yob/preview.png"
  />
));
