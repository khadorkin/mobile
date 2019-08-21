// @flow strict

import translations from '../../translations';
import {getItem} from './core';
import {CONTENT_TYPE} from './_const';
import type {Slide} from './_types';

export const getClue = async (id: string): Promise<string | void> => {
  const language = translations.getLanguage();

  return new Promise(function(resolve, reject) {
    getItem(CONTENT_TYPE.SLIDE, language, id, (error, slide) => {
      resolve(slide && slide.clue);
    });
  });
};

export default getClue;
