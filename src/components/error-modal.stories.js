// @flow

import * as React from 'react';
import {storiesOf} from '@storybook/react-native';
import {View} from 'react-native';
import renderer from 'react-test-renderer';
import {handleFakePress} from '../utils/tests';

import {__TEST__} from '../modules/environment';
import {ERROR_TYPE} from '../const';
import ErrorModal from './error-modal';

storiesOf('ErrorModal', module)
  .add('No Content Found case', () => (
    <View>
      <ErrorModal
        type={ERROR_TYPE.NO_CONTENT_FOUND}
        onRefresh={handleFakePress}
        onAssistancePress={handleFakePress}
        onClose={handleFakePress}
      />
    </View>
  ))
  .add('Platform not activated case', () => (
    <View>
      <ErrorModal
        type={ERROR_TYPE.PLATFORM_NOT_ACTIVATED}
        onRefresh={handleFakePress}
        onClose={handleFakePress}
        onAssistancePress={handleFakePress}
      />
    </View>
  ));

if (__TEST__) {
  describe('ErrorModal', () => {
    it('should open assistance', () => {
      const handleAssistancePress = jest.fn();
      const component = renderer.create(
        <View>
          <ErrorModal
            type={ERROR_TYPE.NO_CONTENT_FOUND}
            onRefresh={handleFakePress}
            onAssistancePress={handleAssistancePress}
            onClose={handleFakePress}
          />
        </View>
      );
      const button = component.root.find(el => el.props.testID === 'ask-for-help');
      button.props.onPress();
      expect(handleAssistancePress).toHaveBeenCalledTimes(1);
    });

    it('should refresh action on button press', () => {
      const handleRefresh = jest.fn();
      const component = renderer.create(
        <View>
          <ErrorModal
            type={ERROR_TYPE.NO_CONTENT_FOUND}
            onRefresh={handleRefresh}
            onAssistancePress={handleFakePress}
            onClose={handleFakePress}
          />
        </View>
      );
      const button = component.root.find(el => el.props.testID === 'button-retry-action');
      button.props.onPress();
      expect(handleRefresh).toHaveBeenCalledTimes(1);
    });

    it('should open assistance on button press', () => {
      const handleAssistancePress = jest.fn();
      const component = renderer.create(
        <View>
          <ErrorModal
            type={ERROR_TYPE.PLATFORM_NOT_ACTIVATED}
            onRefresh={handleFakePress}
            onAssistancePress={handleAssistancePress}
            onClose={handleFakePress}
          />
        </View>
      );
      const button = component.root.find(el => el.props.testID === 'button-retry-action');
      button.props.onPress();
      expect(handleAssistancePress).toHaveBeenCalledTimes(1);
    });

    it('should handle close', () => {
      const handleClose = jest.fn();
      const component = renderer.create(
        <View>
          <ErrorModal
            type={ERROR_TYPE.PLATFORM_NOT_ACTIVATED}
            onRefresh={handleFakePress}
            onAssistancePress={handleFakePress}
            onClose={handleClose}
          />
        </View>
      );
      const button = component.root.find(el => el.props.testID === 'close-modal');
      button.props.onPress();
      expect(handleClose).toHaveBeenCalledTimes(1);
    });
  });
}
