// @flow

import * as React from 'react';
import {hydrate} from 'react-dom';

import StorybookUI from './storybook';
import App from './src';
import {__STORYBOOK__} from './src/modules/environment';

hydrate(__STORYBOOK__ ? <StorybookUI /> : <App />, document.getElementById('root'));
