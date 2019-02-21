// @flow

import * as React from 'react';
import {storiesOf} from '@storybook/react-native';
import renderer from 'react-test-renderer';
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
    it('should handle onPress callback', () => {
      const handlePress = jest.fn();
      const component = renderer.create(
        <TestContextProvider>
          <ResourcesBrowser resources={twoResources} selectResource={handlePress} />
        </TestContextProvider>
      );

      const line = component.root.find(el => el.props.testID === 'resource-0');
      line.props.onPress();
      expect(handlePress.mock.calls.length).toBe(1);
      expect(handlePress.mock.calls[0]).toEqual([oneResource[0]._id]);
    });

    it('should hide resource if only one Resource is provided', () => {
      const handlePress = jest.fn();
      const component = renderer.create(
        <TestContextProvider>
          <ResourcesBrowser resources={oneResource} selectResource={handlePress} />
        </TestContextProvider>
      );

      expect(() => component.root.find(el => el.props.testID === 'resource-0')).toThrow(
        'No instances found matching custom predicate'
      );
    });
  });
}
