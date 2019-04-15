// @flow

import * as React from 'react';
import {storiesOf} from '@storybook/react-native';

import {QUESTION_TYPE} from '../const';
import {handleFakePress} from '../utils/tests';
import {choices, choicesWithImage} from '../__fixtures__/question-choices';
import {image} from '../__fixtures__/medias';
import Question from './question';
import {template, items, userChoices} from './question-template.stories';

storiesOf('Question', module)
  .add('QCM', () => (
    <Question
      type={QUESTION_TYPE.QCM}
      header="What is the online Apple application store called?"
      explanation="Select the correct answers"
      choices={choices}
      userChoices={[]}
      onInputValueChange={handleFakePress}
      onChoicePress={handleFakePress}
      onChoiceInputChange={handleFakePress}
      onButtonPress={handleFakePress}
      isValidating={false}
      onSliderChange={handleFakePress}
    />
  ))
  .add('QCM Graphic', () => (
    <Question
      type={QUESTION_TYPE.QCM_GRAPHIC}
      header="What is the online Apple application store called?"
      explanation="Select the correct answers"
      choices={choicesWithImage}
      onInputValueChange={handleFakePress}
      userChoices={[]}
      onChoicePress={handleFakePress}
      onChoiceInputChange={handleFakePress}
      onButtonPress={handleFakePress}
      isValidating={false}
      onSliderChange={handleFakePress}
    />
  ))
  .add('Template', () => (
    <Question
      type={QUESTION_TYPE.TEMPLATE}
      header="What is the online Apple application store called?"
      explanation="Select the correct answers"
      template={template}
      choices={items}
      userChoices={userChoices}
      onChoicePress={handleFakePress}
      onInputValueChange={handleFakePress}
      onChoiceInputChange={handleFakePress}
      onButtonPress={handleFakePress}
      isValidating={false}
      onSliderChange={handleFakePress}
    />
  ))
  .add('Option selected', () => (
    <Question
      type={QUESTION_TYPE.QCM}
      header="What is the online Apple application store called?"
      explanation="Select the correct answers"
      choices={choices}
      userChoices={[choices[1].label]}
      onChoicePress={handleFakePress}
      onInputValueChange={handleFakePress}
      onChoiceInputChange={handleFakePress}
      onButtonPress={handleFakePress}
      isValidating={false}
      onSliderChange={handleFakePress}
    />
  ))
  .add('With image', () => (
    <Question
      type={QUESTION_TYPE.QCM}
      header="What is the online Apple application store called?"
      explanation="Select the correct answers"
      choices={choices}
      userChoices={[]}
      media={image}
      onChoicePress={handleFakePress}
      onInputValueChange={handleFakePress}
      onChoiceInputChange={handleFakePress}
      onButtonPress={handleFakePress}
      isValidating={false}
      onSliderChange={handleFakePress}
    />
  ))
  .add('QCM Drag and Drop - with selected choices', () => (
    <Question
      type={QUESTION_TYPE.DRAG_DROP}
      header="What is the online Apple application store called?"
      explanation="Select the correct answers"
      choices={choices}
      userChoices={[choices[1].label]}
      onChoicePress={handleFakePress}
      onChoiceInputChange={handleFakePress}
      onInputValueChange={handleFakePress}
      onButtonPress={handleFakePress}
      isValidating={false}
      onSliderChange={handleFakePress}
    />
  ))
  .add('QCM Drag and Drop - with no selected choices', () => (
    <Question
      type={QUESTION_TYPE.DRAG_DROP}
      header="What is the online Apple application store called?"
      explanation="Select the correct answers"
      choices={choices}
      userChoices={[]}
      onChoicePress={handleFakePress}
      onChoiceInputChange={handleFakePress}
      onButtonPress={handleFakePress}
      onInputValueChange={handleFakePress}
      isValidating={false}
      onSliderChange={handleFakePress}
    />
  ))
  .add('BasicQuestion', () => (
    <Question
      type={QUESTION_TYPE.BASIC}
      header="What is the online Apple application store called?"
      explanation="Select the correct answers"
      choices={choices}
      userChoices={[]}
      onChoicePress={handleFakePress}
      onChoiceInputChange={handleFakePress}
      onButtonPress={handleFakePress}
      onInputValueChange={handleFakePress}
      isValidating={false}
      onSliderChange={handleFakePress}
    />
  ));
