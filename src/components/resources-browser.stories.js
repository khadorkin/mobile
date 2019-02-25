// @flow

import * as React from 'react';
import {storiesOf} from '@storybook/react-native';
import renderer from 'react-test-renderer';
import {createVideo, createPdf} from '../__fixtures__/lessons';
import {TestContextProvider, handleFakePress} from '../utils/tests';

import ResourcesBrowser from './resources-browser';

const resources = [
  createVideo({ref: 'les_1'}),
  createPdf({ref: 'les_2'}),
  createVideo({ref: 'les_3'}),
  createVideo({ref: 'les_4'}),
  createVideo({ref: 'les_5'}),
  createVideo({ref: 'les_6'})
];

storiesOf('ResourcesBrowser', module)
  .add('Default', () => <ResourcesBrowser resources={resources} onChange={handleFakePress} />)
  .add('Selected', () => (
    <ResourcesBrowser
      resources={resources}
      selected={resources[1]._id}
      onChange={handleFakePress}
    />
  ))
  .add('Only one resource', () => (
    <ResourcesBrowser
      resources={resources.filter(resource => resource.ref === 'les_1')}
      onChange={handleFakePress}
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
            selected={resources[0]._id}
            resources={resources}
          />
        </TestContextProvider>
      );

      const item = component.root.find(el => el.props.testID === `resource-les-2`);
      item.props.onPress();
      expect(handlePress.mock.calls.length).toBe(1);
      expect(handlePress.mock.calls[0]).toEqual([resources[1]._id]);
    });
  });
}
