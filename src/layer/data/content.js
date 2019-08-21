// @flow strict

import type {SlideAPI, ChapterAPI, LevelAPI} from '@coorpacademy/player-services';

import translations from '../../translations';
import {time} from '../../modules/time';
import type {RestrictedResourceType, Level, Chapter, Slide} from './_types';
import {CONTENT_TYPE} from './_const';
import {getItem} from './core';

import {mapToLevelAPI, mapToChapterAPI, mapToSlideAPI} from './mappers';

export const find = (
  resourceType: RestrictedResourceType,
  ref: string
): Promise<ChapterAPI | LevelAPI | SlideAPI | void> => {
  const language = translations.getLanguage();

  console.log(`dataLayer content.find | ${resourceType} | getItem | 1/2`, time());
  // $FlowFixMe exact type vs inexact type

  return new Promise(function(resolve, reject) {
    getItem(resourceType, language, ref, (error, resource) => {
      if (!resource) {
        return undefined;
      }

      console.log('dataLayer content.find | map result | 2/2', time());
      switch (resourceType) {
        case CONTENT_TYPE.LEVEL: {
          const level: Level = resource;
          console.log({level: mapToLevelAPI(level)});
          resolve(mapToLevelAPI(level));
          break;
        }
        case CONTENT_TYPE.CHAPTER: {
          const chapter: Chapter = resource;
          resolve(mapToChapterAPI(chapter));
          break;
        }
        case CONTENT_TYPE.SLIDE: {
          const slide: Slide = resource;
          resolve(mapToSlideAPI(slide));
          break;
        }
        default:
          reject(new Error(`${resourceType} not implemented`));
      }
    });
  });
};
export default find;
