// @flow strict

import type {LevelAPI} from '@coorpacademy/player-services';

import translations from '../../translations';
import {time} from '../../modules/time';
import {getItem} from './core';
import {CONTENT_TYPE} from './_const';
import type {Level, Discipline} from './_types';
import {mapToLevelAPI} from './mappers';
import {findByLevel as findDisciplineByLevel} from './disciplines';

export const findById = async (ref: string): Promise<LevelAPI> => {
  const language = translations.getLanguage();

  console.log('dataLayer level.findById | getItem | 1/2', time());

  // $FlowFixMe union type
  const item: Level = await getItem(CONTENT_TYPE.LEVEL, language, ref);
  console.log('dataLayer level.findById | map result | 2/2', time());
  return item && mapToLevelAPI(item);
};

export const getNextLevel = async (ref: string): Promise<LevelAPI | void> => {
  const discipline: Discipline | void = await findDisciplineByLevel(ref);

  if (!discipline) {
    return;
  }

  const levelIndex = discipline.modules.findIndex(mod => [mod.universalRef, mod.ref].includes(ref));
  const nextLevel = discipline.modules[levelIndex + 1];

  if (!nextLevel) {
    return;
  }

  return findById(nextLevel.ref);
};
