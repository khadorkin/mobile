// @flow strict

import type {
  QuestionCommon,
  QCMQuestion,
  QCMGraphicQuestion
} from '@coorpacademy/progression-engine';

import {QUESTION_TYPE} from '../const';

import {choices, choicesWithImage} from './question-choices';

export const common: QuestionCommon = {
  header: 'Quel store est utilisé pour publier des applications iOS',
  explanation: 'Sélectionnez la bonne réponse.'
};

export const qcm: QCMQuestion = {
  ...common,
  type: QUESTION_TYPE.QCM,
  content: {
    answers: [[choices[2].label]],
    choices
  }
};

export const qcmGraphic: QCMGraphicQuestion = {
  ...common,
  type: QUESTION_TYPE.QCM_GRAPHIC,
  content: {
    answers: [[choices[2].label]],
    choicesWithImage
  }
};

export default {
  qcm,
  qcmGraphic
};
