import * as React from 'react';
import {storiesOf} from '@storybook/react-native';

import {QUESTION_TYPE} from '../const';
import {handleFakePress, TestContextProvider} from '../utils/tests';
import {choices, choicesWithImage} from '../__fixtures__/question-choices';
import {image, video} from '../__fixtures__/medias';
import Question from './question';
import {template, items, userChoices} from './question-template.stories';

const handleFakePressP = async () => {
  await handleFakePress;
};

storiesOf('Question', module)
  .add('Default', () => (
    <Question
      choices={choices}
      userChoices={[]}
      isValidationDisabled
      onInputValueChange={handleFakePress}
      onChoicePress={handleFakePress}
      onChoiceInputChange={handleFakePress}
      onButtonPress={handleFakePressP}
      onSliderChange={handleFakePress}
    />
  ))
  .add('QCM', () => (
    <Question
      type={QUESTION_TYPE.QCM}
      header="What is the online Apple application store called?"
      explanation="Select the correct answers"
      choices={choices}
      userChoices={[]}
      isValidationDisabled
      onInputValueChange={handleFakePress}
      onChoicePress={handleFakePress}
      onChoiceInputChange={handleFakePress}
      onButtonPress={handleFakePressP}
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
      isValidationDisabled
      onChoicePress={handleFakePress}
      onChoiceInputChange={handleFakePress}
      onButtonPress={handleFakePressP}
      onSliderChange={handleFakePress}
    />
  ))
  .add('Template', () => (
    <TestContextProvider>
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
        onButtonPress={handleFakePressP}
        onSliderChange={handleFakePress}
      />
    </TestContextProvider>
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
      onButtonPress={handleFakePressP}
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
      isValidationDisabled
      onChoicePress={handleFakePress}
      onInputValueChange={handleFakePress}
      onChoiceInputChange={handleFakePress}
      onButtonPress={handleFakePressP}
      onSliderChange={handleFakePress}
    />
  ))
  .add('With Video', () => (
    <TestContextProvider>
      <Question
        type={QUESTION_TYPE.QCM}
        header="What is the online Apple application store called?"
        explanation="Select the correct answers"
        choices={choices}
        userChoices={[]}
        media={video}
        isValidationDisabled
        onChoicePress={handleFakePress}
        onInputValueChange={handleFakePress}
        onChoiceInputChange={handleFakePress}
        onButtonPress={handleFakePressP}
        onSliderChange={handleFakePress}
      />
    </TestContextProvider>
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
      onButtonPress={handleFakePressP}
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
      isValidationDisabled
      onChoicePress={handleFakePress}
      onChoiceInputChange={handleFakePress}
      onButtonPress={handleFakePressP}
      onInputValueChange={handleFakePress}
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
      isValidationDisabled
      onChoicePress={handleFakePress}
      onChoiceInputChange={handleFakePress}
      onButtonPress={handleFakePressP}
      onInputValueChange={handleFakePress}
      onSliderChange={handleFakePress}
    />
  ));
