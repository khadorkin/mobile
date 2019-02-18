// @flow

import * as React from 'react';
import renderer from 'react-test-renderer';
import {storiesOf} from '@storybook/react-native';
import {createVideo, lessonWithPdf} from '../__fixtures__/lessons';
import {TestContextProvider} from '../utils/tests';

import ResourcesBrowser from './resources-browser';

const manyResources = [
  createVideo({}),
  {...lessonWithPdf, selected: true},
  createVideo({}),
  createVideo({}),
  createVideo({}),
  createVideo({})
];

const fakeSelectResource = (id: string) => ({
  type: '@@ui/SELECT_RESOURCE_IN_POPIN',
  payload: {
    id
  }
});

const oneResource = [createVideo({})];
const twoResources = [createVideo({}), lessonWithPdf];

storiesOf('ResourcesBrowser', module)
  .add('Many lessons', () => (
    <ResourcesBrowser resources={manyResources} selectResource={fakeSelectResource} />
  ))
  .add('Two lessons', () => (
    <ResourcesBrowser resources={twoResources} selectResource={fakeSelectResource} />
  ))
  .add('One lesson', () => (
    <ResourcesBrowser resources={oneResource} selectResource={fakeSelectResource} />
  ));

if (process.env.NODE_ENV === 'test') {
  describe('ResourcesBrowser', () => {
    it('should handle selectResource callback', () => {
      const fakePress = jest.fn();
      const component = renderer.create(
        <TestContextProvider>
          <ResourcesBrowser resources={oneResource} selectResource={fakePress} />
        </TestContextProvider>
      );
      const button = component.root.find(el => el.props.testID === 'button-open-pdf');
      button.props.onPress();
      expect(fakePress.mock.calls.length).toBe(1);
      expect(fakePress.mock.calls[0]).toEqual(['plop']);
    });
  });
}
