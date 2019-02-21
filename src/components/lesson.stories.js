// @flow

import * as React from 'react';
import {storiesOf} from '@storybook/react-native';

import {createVideo, lessonWithPdf} from '../__fixtures__/lessons';
import {TestContextProvider, handleFakePress, fakeLayout} from '../utils/tests';
import {Component as Lesson} from './lesson';

const video = createVideo({});

storiesOf('Lesson', module)
  .add('No selected resource', () => (
    <TestContextProvider>
      <Lesson
        header="What was the nationality of Steve Jobs?"
        resources={[video, lessonWithPdf]}
        onChange={handleFakePress}
        starsGranted={4}
        selectedResourceId={video._id}
        layout={fakeLayout}
        onPDFButtonPress={handleFakePress}
      />
    </TestContextProvider>
  ))
  .add('Default', () => (
    <TestContextProvider>
      <Lesson
        header="What was the nationality of Steve Jobs?"
        resources={[createVideo({}), lessonWithPdf]}
        selectedResourceId={lessonWithPdf._id}
        onChange={handleFakePress}
        starsGranted={4}
        layout={fakeLayout}
        onPDFButtonPress={handleFakePress}
      />
    </TestContextProvider>
  ))
  .add('Without layout', () => (
    <TestContextProvider>
      <Lesson
        header="What was the nationality of Steve Jobs?"
        resources={[createVideo({}), lessonWithPdf]}
        selectedResourceId={video._id}
        onChange={handleFakePress}
        starsGranted={4}
        onPDFButtonPress={handleFakePress}
      />
    </TestContextProvider>
  ));
