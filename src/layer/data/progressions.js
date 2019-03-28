// @flow

import {AsyncStorage} from 'react-native';

import fetch from 'cross-fetch';
import type {Progression, Action} from '@coorpacademy/progression-engine';
import {isDone} from '../../utils/progressions';
import {CONTENT_TYPE, SPECIFIC_CONTENT_REF} from '../../const';

import type {SupportedLanguage} from '../../translations/_types';
import {getItem} from './core';

export const buildLastProgressionKey = (engineRef: string, contentRef: string) =>
  `last_progression_${engineRef}_${contentRef}`;

export const buildProgressionKey = (progressionId: string) => `progression_${progressionId}`;

const findById = async (id: string) => {
  const progression = await AsyncStorage.getItem(buildProgressionKey(id));
  if (!progression) throw new Error('Progression not found');
  return JSON.parse(progression);
};

const getAll = async () => {
  const keys = await AsyncStorage.getAllKeys();
  const filteredKeys = keys.filter(key => key.startsWith('progression'));
  const items = await AsyncStorage.multiGet(filteredKeys);

  return items.map(([key, value]) => {
    return JSON.parse(value);
  });
};

const META = {source: 'mobile'};
const synchronize = async (
  token: string,
  host: string,
  progression: Progression
): Promise<void> => {
  const {_id, content, actions, engine, engineOptions} = progression;

  if (_id === undefined) throw new TypeError('progression has no property _id');

  const response = await fetch(`${host}/api/v2/progressions`, {
    method: 'POST',
    headers: {
      'X-Requested-With': 'XMLHttpRequest',
      'Content-Type': 'application/json',
      Authorization: token
    },
    body: JSON.stringify({
      _id,
      content,
      actions,
      engine,
      engineOptions,
      meta: META
    })
  });

  if (response.status >= 400) throw new Error(response.statusText);

  await AsyncStorage.removeItem(buildProgressionKey(_id));

  return;
};

const addCreatedAtToAction = (progression: Progression): Progression => {
  const now = new Date().toISOString();
  return {
    ...progression,
    actions:
      progression.actions &&
      progression.actions.map((action: Action): Action => {
        // $FlowFixMe spread operator
        return {
          ...action,
          createdAt: action.createdAt || now
        };
      })
  };
};

const persist = async (progression: Progression): Promise<Progression> => {
  const {_id} = progression;
  if (_id === undefined) throw new TypeError('progression has no property _id');

  await AsyncStorage.setItem(buildProgressionKey(_id), JSON.stringify(progression));
  await AsyncStorage.setItem(
    buildLastProgressionKey(progression.engine.ref, progression.content.ref),
    progression._id || ''
  );

  return progression;
};

const save = (progression: Progression): Promise<Progression> =>
  persist(addCreatedAtToAction(progression));

const findLast = async (engineRef: string, contentRef: string) => {
  const key = buildLastProgressionKey(engineRef, contentRef);
  const progressionId = await AsyncStorage.getItem(key);
  if (!progressionId) return null;

  const stringifiedProgression = await AsyncStorage.getItem(buildProgressionKey(progressionId));

  if (!stringifiedProgression) return null;

  // if Progression is on successNode, failureNode or extraLifeNode
  // then skip resuming

  const progression = JSON.parse(stringifiedProgression);
  const {nextContent} = progression.state;
  if (
    isDone(progression) ||
    (nextContent.type === CONTENT_TYPE.NODE && nextContent.ref === SPECIFIC_CONTENT_REF.EXTRA_LIFE)
  ) {
    return null;
  }

  return progression;
};

const findBestOf = (language: SupportedLanguage) => async (
  engineRef: string,
  contentType: {ref: string, type: string},
  contentRef: string,
  progressionId: string
): Promise<number> => {
  // $FlowFixMe
  const card = await getItem('card', contentRef, language);
  return card && card.stars;
};
export {save, getAll, findById, findLast, findBestOf, synchronize};
