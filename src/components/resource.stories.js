// @flow

import * as React from 'react';
import {storiesOf} from '@storybook/react-native';
import renderer from 'react-test-renderer';

import {createVideo, lessonWithPdf} from '../__fixtures__/lessons';
import {TestContextProvider, handleFakePress} from '../utils/tests';
import {getCleanUri} from '../modules/uri';
import Resource from './resource';

storiesOf('Resource', module)
  .add('Video', () => (
    <TestContextProvider>
      <Resource resource={createVideo({})} height={200} onPDFButtonPress={handleFakePress} />
    </TestContextProvider>
  ))
  .add('Pdf', () => (
    <TestContextProvider>
      <Resource resource={lessonWithPdf} height={200} onPDFButtonPress={handleFakePress} />
    </TestContextProvider>
  ));

if (process.env.NODE_ENV === 'test') {
  describe('Resource', () => {
    it('should handle onPress callback', () => {
      const handlePress = jest.fn();
      const component = renderer.create(
        <TestContextProvider>
          <Resource resource={lessonWithPdf} height={200} onPDFButtonPress={handlePress} />
        </TestContextProvider>
      );

      const button = component.root.find(el => el.props.testID === 'button-open-pdf');
      button.props.onPress();
      expect(handlePress.mock.calls.length).toBe(1);
      expect(handlePress.mock.calls[0]).toEqual([
        getCleanUri(lessonWithPdf.mediaUrl),
        lessonWithPdf.description
      ]);
    });
  });
}
