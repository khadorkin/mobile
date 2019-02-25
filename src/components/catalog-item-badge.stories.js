// @flow

import * as React from 'react';
import {storiesOf} from '@storybook/react-native';

import Badge from './catalog-item-badge';

storiesOf('Catalogue Item Author', module).add('Default', () => (
  <Badge label="New" minWidth={45} minHeight={20} fontSize={8} testID="badge" />
));
