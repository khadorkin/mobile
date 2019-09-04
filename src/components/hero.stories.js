// @flow

import * as React from 'react';

import {storiesOf} from '@storybook/react-native';
import image from '../__fixtures__/assets/landscape-2.jpg';
import Hero from './hero';

storiesOf('Hero', module).add('Default', () => <Hero backgroundImage={image} userName="Pol Pot" />);
