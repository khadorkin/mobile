// @flow strict

import type {SlideAPI} from '@coorpacademy/player-services';

import translations from '../../translations';
import {mapToSlideAPI} from './mappers';
import {getItemsPerResourceType, getItem} from './core';
import {CONTENT_TYPE} from './_const';
import type {Slide} from './_types';

export const findById = async (universalRef: string): Promise<SlideAPI> => {
  const language = translations.getLanguage();
  // $FlowFixMe union type
  const item: Slide = await getItem(CONTENT_TYPE.SLIDE, language, universalRef);
  return mapToSlideAPI(item);
};

// perf note: investigate why this is called 3 times instead of one
// here https://github.com/CoorpAcademy/components/blob/master/packages/%40coorpacademy-player-services/src/progressions.js#L131
export const findByChapter = async (chapterId: string): Promise<Array<SlideAPI>> => {
  const language = translations.getLanguage();
  const slides: Array<Slide> = await getItemsPerResourceType(CONTENT_TYPE.SLIDE, language);
  console.log({slides});
  const flitredSlide = slides.filter(slide => slide.chapter_id === chapterId);
  return flitredSlide.map(slide => mapToSlideAPI(slide));
};
