// @flow

import * as React from 'react';

import {storiesOf} from '@storybook/react-native';
import {fakeLayout} from '../utils/tests';
import {Component as Hero} from './hero';

storiesOf('Hero', module).add('Default', () => <Hero layout={fakeLayout} />);
