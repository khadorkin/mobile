// @flow

import * as React from 'react';

import {storiesOf} from '@storybook/react-native';

import {Component as Hero} from './hero';

storiesOf('Button', module).add('Default', () => (
  <Hero backgroundImage="handleFakePress" userName="Pol Pot" />
));
