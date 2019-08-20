// @flow strict

import type {SlideAPI, ChapterAPI, LevelAPI} from '@coorpacademy/player-services';

import translations from '../../translations';
import {time} from '../../modules/time';
import type {RestrictedResourceType, Level, Chapter, Slide} from './_types';
import {CONTENT_TYPE} from './_const';
import {getItem} from './core';

import {mapToLevelAPI, mapToChapterAPI, mapToSlideAPI} from './mappers';

export const find = async (
  resourceType: RestrictedResourceType,
  ref: string
): Promise<ChapterAPI | LevelAPI | SlideAPI | void> => {
  const language = translations.getLanguage();

  console.log(`dataLayer content.find | ${resourceType} | getItem | 1/2`, time());
  // $FlowFixMe exact type vs inexact type
  const resource = await getItem(resourceType, language, ref);

  if (!resource) {
    return undefined;
  }

  console.log('dataLayer content.find | map result | 2/2', time());
  switch (resourceType) {
    case CONTENT_TYPE.LEVEL: {
      const level: Level = resource;
      return mapToLevelAPI(level);
    }
    case CONTENT_TYPE.CHAPTER: {
      const chapter: Chapter = resource;
      return mapToChapterAPI(chapter);
    }
    case CONTENT_TYPE.SLIDE: {
      const slide: Slide = resource;
      return mapToSlideAPI(slide);
    }
    default:
      throw new Error(`${resourceType} not implemented`);
  }
};
export default find;
