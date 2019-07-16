// @flow strict

import type {SupportedLanguage} from '../../translations/_types';
import type {Discipline, Level} from './_types';
import {CONTENT_TYPE} from './_const';
import {getItem, getItemsPerResourceType} from './core';

export const find = (userLanguage: SupportedLanguage) => async (
  ref: string
): Promise<Discipline | void> => {
  // $FlowFixMe union type
  const discipline: Discipline = await getItem(CONTENT_TYPE.DISCIPLINE, userLanguage, ref);

  return discipline;
};

export const findByLevel = (userLanguage: SupportedLanguage) => async (
  ref: string
): Promise<Discipline | void> => {
  // $FlowFixMe union type
  const level: Level = await getItem(CONTENT_TYPE.LEVEL, userLanguage, ref);
  const disciplines: Array<Discipline> = await getItemsPerResourceType(
    CONTENT_TYPE.DISCIPLINE,
    userLanguage
  );
  const discipline = disciplines.find(item =>
    item.modules.findIndex(mod => [mod.ref, mod.universalRef].includes(level.ref))
  );

  return discipline;
};
