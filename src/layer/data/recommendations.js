// @flow

import type {ChapterAPI, LevelAPI, RecommendationAPI} from '@coorpacademy/player-services';

import translations from '../../translations';
import type {SupportedLanguage} from '../../translations/_types';
import {pickNextCardLevel} from '../../utils/content';
import {CONTENT_TYPE} from '../../const';
import type {DisciplineCard} from './_types';
import {getCardFromLocalStorage} from './cards';
import {find as findChapters} from './chapters';
import {findById as findLevelById} from './levels';

const find = async (type: string, ref: string): Promise<Array<RecommendationAPI>> => {
  const chapters: Array<ChapterAPI> = await findChapters(translations.getLanguage())();

  // $FlowFixMe this type is totally fucked up
  const recommendations: Array<RecommendationAPI> = chapters.map(chapter => ({
    view: 'grid',
    image: chapter && chapter.poster && chapter.poster.mediaUrl,
    time: '8m',
    type: CONTENT_TYPE.CHAPTER,
    progress: 1,
    title: chapter.name,
    ref: chapter._id
  }));

  return Promise.resolve(recommendations);
};

const getNextLevel = (language: SupportedLanguage) => async (
  ref: string
): Promise<LevelAPI | void> => {
  // $FlowFixMe
  const disciplineCard: DisciplineCard | void = await getCardFromLocalStorage(ref, language);

  if (!disciplineCard) {
    return;
  }

  const nextCardLevel = pickNextCardLevel(disciplineCard);

  if (!nextCardLevel || nextCardLevel.ref === ref || nextCardLevel.universalRef === ref) {
    return;
  }

  return findLevelById(language)(nextCardLevel.universalRef);
};

export {find, getNextLevel};
