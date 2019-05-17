// @flow

import * as React from 'react';
import {createBrowserApp} from '@react-navigation/web';

import navigator from './root';

const Navigator = createAppContainer(navigator);

export default Navigator;
