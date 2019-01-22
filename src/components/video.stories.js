// @flow

import * as React from 'react';
import {storiesOf} from '@storybook/react-native';

import video from '../__fixtures__/video.mp4';
import Video from './video';

const handleFake = () => {};

storiesOf('Video', module)
  .add('Default', () => <Video source={video} />)
  .add('Fullscreen', () => <Video source={video} onExpand={handleFake} onShrink={handleFake} />)
  .add('Remote video', () => (
    <Video source={{uri: 'https://content.jwplatform.com/videos/Piqz1Sdy.mp4'}} />
  ));
