// @flow

import * as React from 'react';
import {storiesOf} from '@storybook/react-native';

import Placeholder from './placeholder';
import PlaceholderLine from './placeholder-line';

storiesOf('Placeholder', module)
  .add('Default', () => (
    <Placeholder>
      <PlaceholderLine width="70%" />
    </Placeholder>
  ))
  .add('Animated', () => (
    <Placeholder isAnimated>
      <PlaceholderLine width="70%" />
    </Placeholder>
  ));
