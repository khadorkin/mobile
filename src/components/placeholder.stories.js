// @flow

import * as React from 'react';
import {storiesOf} from '@storybook/react-native';
import {Text, View} from 'react-native';
import {Line} from 'rn-placeholder';

import Placeholder from './placeholder';

const handleRenderPlaceHolder = () => (
  <View style={{paddingBottom: 12}}>
    <Line style={{backgroundColor: '#cccccc'}} width="70%" />
  </View>
);

storiesOf('PlaceHolder', module).add('Default', () => (
  <Placeholder onLoading={handleRenderPlaceHolder} isReady={false}>
    <Text> Ha ba ba ba bababbababa </Text>
  </Placeholder>
));
