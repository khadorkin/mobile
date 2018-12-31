// @flow strict
/* eslint-disable import/prefer-default-export */

import type {QuestionType, SpaceType, MediaType} from './types';

type QuestionTypeKey = 'QCM' | 'QCM_GRAPHIC';
export const QUESTION_TYPE: {
  [QuestionTypeKey]: QuestionType
} = {
  QCM: 'qcm',
  QCM_GRAPHIC: 'qcmGraphic'
};

export const SPACE: {
  [string]: SpaceType
} = {
  TINY: 'tiny',
  SMALL: 'small',
  BASE: 'base',
  LARGE: 'large'
};

export const MEDIA_TYPE: {
  [string]: MediaType
} = {
  IMAGE: 'image'
};