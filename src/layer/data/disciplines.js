// @flow strict

import translations from '../../translations';
import type {Discipline} from './_types';
import {CONTENT_TYPE} from './_const';
import {getItem, getItemsPerResourceType} from './core';

export const find = async (ref: string): Promise<Discipline | void> => {
  const language = translations.getLanguage();
  // $FlowFixMe union type

  return new Promise(function(resolve, reject) {
    getItem(CONTENT_TYPE.DISCIPLINE, language, ref, (error, discipline) => {
      resolve(discipline);
    });
  });
};

export const findByChapter = async (ref: string): Promise<Discipline | void> => {
  const language = translations.getLanguage();
  // $FlowFixMe union type
  const disciplines: Array<Discipline> = await getItemsPerResourceType(
    CONTENT_TYPE.DISCIPLINE,
    language
  );
  const discipline = disciplines.find(item =>
    item.modules.find(mod => mod.chapterIds.includes(ref))
  );

  return discipline;
};

export const findByLevel = async (ref: string): Promise<Discipline | void> => {
  const language = translations.getLanguage();
  // $FlowFixMe union type
  const disciplines: Array<Discipline> = await getItemsPerResourceType(
    CONTENT_TYPE.DISCIPLINE,
    language
  );
  const discipline = disciplines.find(item =>
    item.modules.find(mod => [mod.ref, mod.universalRef].includes(ref))
  );

  return discipline;
};
