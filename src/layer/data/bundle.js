// @flow

import fetch from '../../modules/fetch';
import {__E2E__} from '../../modules/environment';
import {getMostAccurateRef} from '../../modules/reference';
import disciplinesBundle from '../../__fixtures__/discipline-bundle';
import chaptersBundle from '../../__fixtures__/chapter-bundle';
import type {SupportedLanguage} from '../../translations/_types';
import translations from '../../translations';
import {store} from './block-manager';
import {buildKey} from './core';
import type {
  BundledDiscipline,
  BundledChapter,
  Resource,
  ResourceType,
  Level,
  Discipline
} from './_types';

import {CONTENT_TYPE} from './_const';

export const buildResourceMap = (
  resourceType: ResourceType,
  language: SupportedLanguage,
  resource: {[key: string]: Resource}
): Array<Array<string>> => {
  const keys: Array<string> = Object.keys(resource);
  return keys.reduce(
    (acc, key) => ({
      ...acc,
      [buildKey(resourceType, language, key)]: resource[key]
    }),
    {}
  );
};

export const buildLevels = (
  levels: Array<Level>,
  language: SupportedLanguage
): Array<Array<string>> =>
  levels.reduce(
    (acc, level) => ({
      ...acc,
      [`${CONTENT_TYPE.LEVEL}:${language}:${getMostAccurateRef(level)}`]: level
    }),
    {}
  );

export const mapToResourceType = (value: string): ResourceType => {
  switch (value) {
    case 'chapters':
      return CONTENT_TYPE.CHAPTER;
    case 'disciplines':
      return CONTENT_TYPE.DISCIPLINE;
    case 'exitNodes':
      return CONTENT_TYPE.EXIT_NODE;
    case 'slides':
      return CONTENT_TYPE.SLIDE;
    case 'chapterRules':
      return CONTENT_TYPE.CHAPTER_RULE;
    case 'levels':
      return CONTENT_TYPE.LEVEL;
    default:
      throw new Error(`current type ${value} not supported`);
  }
};

export const normalizeBundle = (
  bundledResource: BundledDiscipline | BundledChapter,
  language: SupportedLanguage
) => {
  const keys: Array<string> = Object.keys(bundledResource);
  const disciplines: Array<Discipline> = Object.values(bundledResource.disciplines);
  const levels = buildLevels(
    disciplines.reduce((result, discipline) => result.concat(discipline.modules), []),
    language
  );

  return keys.reduce(
    (acc, k) => ({
      ...acc,
      [k]: buildResourceMap(mapToResourceType(k), language, bundledResource[k])
    }),
    {levels}
  );
};

export const storeBundle = async (
  bundledResource: BundledDiscipline | BundledChapter
): Promise<void> => {
  const language = translations.getLanguage();
  const normalizedBundle = normalizeBundle(bundledResource, language);
  const blockTypes: Array<string> = Object.keys(normalizedBundle);

  try {
    return Promise.all(blockTypes.map(blockType => store(blockType, normalizedBundle[blockType])));
  } catch (e) {
    throw new Error('Could not store the provided resource');
  }
};

export const fetchBundle = async (
  type: typeof CONTENT_TYPE.DISCIPLINE | typeof CONTENT_TYPE.CHAPTER,
  ref: string,
  token: string,
  host: string
): Promise<BundledDiscipline | BundledChapter> => {
  const language = translations.getLanguage();

  if (__E2E__) {
    if (
      type === CONTENT_TYPE.DISCIPLINE &&
      Object.keys(disciplinesBundle.disciplines).includes(ref)
    ) {
      return Promise.resolve(disciplinesBundle);
    }
    if (type === CONTENT_TYPE.CHAPTER && Object.keys(chaptersBundle.chapters).includes(ref)) {
      return Promise.resolve(chaptersBundle);
    }
  }

  const endpoint = type === CONTENT_TYPE.DISCIPLINE ? 'disciplines' : 'chapters';
  const response = await fetch(
    `${host}/api/v2/${endpoint}/bundle?lang=${language}&conditions={"universalRef": ["${ref}"]}`,
    {
      headers: {authorization: token}
    }
  );
  const body = await response.json();
  return body;
};
