// @flow strict

import translations from '../../translations';
import {getItem} from './core';
import {CONTENT_TYPE} from './_const';
import type {Slide} from './_types';

export const getCorrectAnswer = async (slideId: string): Promise<Array<Array<string>>> => {
  const language = await translations.getLanguage();
  // $FlowFixMe resolve reject
  return new Promise(function(resolve, reject) {
    // $FlowFixMe union type
    getItem(CONTENT_TYPE.SLIDE, language, slideId, (error, slide: Slide) =>
      resolve(slide.question.content.answers)
    );
  });
};

export default getCorrectAnswer;
