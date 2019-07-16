// @flow strict

import {
  createProgression,
  CONTENT_TYPE,
  selectProgression,
  getCurrentProgressionId
} from '@coorpacademy/player-store';
import type {Level, Chapter} from '@coorpacademy/player-store';
import type {Engine, EngineConfig, GenericContent} from '@coorpacademy/progression-engine';
import {ObjectId} from 'bson';
import pMap from 'p-map';

import {getMostAccurateRef} from '../../modules/reference';
import type {StoreAction, ErrorAction} from '../_types';
import {getToken, getBrand} from '../utils/state-extract';
import {CARD_TYPE, RESTRICTED_RESOURCE_TYPE} from '../../layer/data/_const';
import {isDone} from '../../utils/progressions';
import {ENGINE} from '../../const';

const ENGINE_VERSION = '1';
const ENGINE_CONFIG_VERSION = '1';

export {selectProgression};

export const selectCurrentProgression = () => (dispatch: Dispatch, getState: GetState) => {
  const state = getState();
  const progressionId = getCurrentProgressionId(state);

  if (progressionId) {
    dispatch(selectProgression(progressionId));
  }
};

export const createLevelProgression = (level: Level) => {
  const ref = getMostAccurateRef(level);
  const engine: Engine = {ref: ENGINE.LEARNER, version: ENGINE_VERSION};
  // @todo use universalRef
  const content: GenericContent = {type: CONTENT_TYPE.LEVEL, ref};
  const engineConfig: EngineConfig = {
    version: ENGINE_CONFIG_VERSION,
    livesDisabled: level.infiniteLives
  };

  return createProgression(new ObjectId().toString(), engine, content, engineConfig);
};

export const createChapterProgression = (chapter: Chapter) => {
  const engine: Engine = {ref: ENGINE.MICROLEARNING, version: ENGINE_VERSION};
  const ref = getMostAccurateRef(chapter);
  const content: GenericContent = {type: CONTENT_TYPE.CHAPTER, ref};
  const engineConfig: EngineConfig = {version: ENGINE_CONFIG_VERSION};

  return createProgression(new ObjectId().toString(), engine, content, engineConfig);
};

export type Action =
  | {|
      type: '@@progression/SYNCHRONIZE_REQUEST',
      meta: {|id: string|}
    |}
  | {|
      type: '@@progression/SYNCHRONIZE_SUCCESS',
      meta: {|id: string|}
    |}
  | ErrorAction<{|
      type: '@@progression/SYNCHRONIZE_FAILURE',
      meta: {|id: string|}
    |}>;

export const synchronizeProgression = (progressionId: string): StoreAction<Action> => {
  return async (dispatch, getState, options) => {
    await dispatch({
      type: '@@progression/SYNCHRONIZE_REQUEST',
      meta: {id: progressionId}
    });

    const state = getState();
    const token = getToken(state);
    const brand = getBrand(state);

    const {services} = options;

    try {
      if (token === null) throw new TypeError('Token not defined');
      if (brand === null) throw new TypeError('Brand not defined');

      const progression = await services.Progressions.findById(progressionId);
      if (progression) await services.Progressions.synchronize(token, brand.host, progression);

      return dispatch({
        type: '@@progression/SYNCHRONIZE_SUCCESS',
        meta: {id: progressionId}
      });
    } catch (err) {
      return dispatch({
        type: '@@progression/SYNCHRONIZE_FAILURE',
        error: true,
        payload: err,
        meta: {id: progressionId}
      });
    }
  };
};
export type NextProgressionAction =
  | {|
      type: '@@progression/CREATE_NEXT_REQUEST',
      meta: {|type: string, ref: string|}
    |}
  | {|
      type: '@@progression/CREATE_NEXT_SUCCESS',
      meta: {|type: string, ref: string|}
    |}
  | ErrorAction<{|
      type: '@@progression/CREATE_NEXT_FAILURE',
      meta: {|type: string, ref: string|}
    |}>;

export const createNextProgression = (
  type: string,
  ref: string
): StoreAction<NextProgressionAction> => async (dispatch, getState, options) => {
  const {services} = options;

  await dispatch({
    type: '@@progression/CREATE_NEXT_REQUEST',
    meta: {type, ref}
  });

  switch (type) {
    case CARD_TYPE.CHAPTER: {
      // Resume progression
      const lastProgression = await services.Progressions.findLast(ENGINE.MICROLEARNING, ref);

      if (lastProgression) {
        // $FlowFixMe union type
        return dispatch(selectProgression(lastProgression._id));
      }

      const chapter = await services.Content.find(RESTRICTED_RESOURCE_TYPE.CHAPTER, ref);

      // $FlowFixMe union type
      const {payload: progression} = await dispatch(createChapterProgression(chapter));
      // $FlowFixMe union type
      await dispatch(selectProgression(progression._id));
      break;
    }
    case CARD_TYPE.COURSE: {
      const lastProgression = await services.Progressions.findLast(ENGINE.LEARNER, ref);
      if (lastProgression) {
        // $FlowFixMe union type
        return dispatch(selectProgression(lastProgression._id));
      }

      const level = await services.Content.find(RESTRICTED_RESOURCE_TYPE.LEVEL, ref);
      debugger;

      // $FlowFixMe union type
      const {payload: progression} = await dispatch(createLevelProgression(level));
      // $FlowFixMe union type
      await dispatch(selectProgression(progression._id));
      break;
    }

    default: {
      return dispatch({
        type: '@@progression/CREATE_NEXT_FAILURE',
        payoad: new Error(`content type ${type} is not handled`),
        error: true,
        meta: {type, ref}
      });
    }
  }

  return dispatch({
    type: '@@progression/CREATE_NEXT_SUCCESS',
    meta: {type, ref}
  });
};

export const synchronizeProgressions: StoreAction<Action> = async (dispatch, getState, options) => {
  const {services} = options;

  const progressions = await services.Progressions.getAll();
  await pMap(
    progressions.filter(isDone),
    (progression): Promise<Action | void> => {
      const {_id} = progression;
      if (_id) {
        return dispatch(synchronizeProgression(_id));
      }
      return Promise.resolve();
    },
    {concurrency: 1}
  );

  return;
};
