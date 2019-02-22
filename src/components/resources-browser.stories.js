// @flow

import * as React from 'react';
import {storiesOf} from '@storybook/react-native';
import renderer from 'react-test-renderer';
import {createVideo, lessonWithPdf} from '../__fixtures__/lessons';
import {TestContextProvider, handleFakePress} from '../utils/tests';

import ResourcesBrowser from './resources-browser';

const manyResources = [
  createVideo({}),
  lessonWithPdf,
  createVideo({}),
  createVideo({}),
  createVideo({}),
  createVideo({})
];

const oneResource = [createVideo({})];
const twoResources = [createVideo({}), lessonWithPdf];

storiesOf('ResourcesBrowser', module)
  .add('Many lessons', () => (
    <ResourcesBrowser
      resources={manyResources}
      selectedResourceId={manyResources[0]._id}
      onChange={handleFakePress}
    />
  ))
  .add('Two lessons, video selected', () => (
    <ResourcesBrowser
      onChange={handleFakePress}
      resources={twoResources}
      selectedResourceId={twoResources[0]._id}
    />
  ))
  .add('Two lessons, pdf selected', () => (
    <ResourcesBrowser
      onChange={handleFakePress}
      resources={twoResources}
      selectedResourceId={twoResources[1]._id}
    />
  ))
  .add('One lesson', () => (
    <ResourcesBrowser
      onChange={handleFakePress}
      resources={oneResource}
      selectedResourceId={oneResource[0]._id}
    />
  ));

if (process.env.NODE_ENV === 'test') {
  describe('ResourcesBrowser', () => {
    it('should handle onPress callback', () => {
      const handlePress = jest.fn();
      const component = renderer.create(
        <TestContextProvider>
          <ResourcesBrowser
            onChange={handlePress}
            selectedResourceId={twoResources[0]._id}
            resources={twoResources}
          />
        </TestContextProvider>
      );

      const line = component.root.find(
        el => el.props.testID === `resource-${twoResources[1]._id}-unselected`
      );
      line.props.onPress();
      expect(handlePress.mock.calls.length).toBe(1);
      expect(handlePress.mock.calls[0]).toEqual([twoResources[1]._id]);
    });

    it('should hide resource if only one Resource is provided', () => {
      const handlePress = jest.fn();
      const component = renderer.create(
        <TestContextProvider>
          <ResourcesBrowser
            onChange={handlePress}
            resources={oneResource}
            selectedResourceId={oneResource[0]._id}
          />
        </TestContextProvider>
      );

      expect(() => component.root.find(el => el.props.testID === 'resource-0-selected')).toThrow(
        'No instances found matching custom predicate'
      );
    });
  });
}
