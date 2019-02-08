// @flow strict

import {createProgression} from '@coorpacademy/player-store';
import type {Level, Chapter} from '@coorpacademy/player-store';
import type {Engine, Content, EngineConfig} from '@coorpacademy/progression-engine';

import {CONTENT_TYPE, ENGINE} from '../../const';

/* eslint-disable import/prefer-default-export */

export const SELECT_CONTENT = 'SELECT_CONTENT';

const ENGINE_VERSION = '1';
const ENGINE_CONFIG_VERSION = '1';

type Meta = {|
  chapter?: Chapter,
  level?: Level
|};

export type Action = {|
  type: 'SELECT_CONTENT',
  meta: Meta
|};

const selectContent = ({chapter, level}: Meta): Action => ({
  type: SELECT_CONTENT,
  meta: {
    chapter,
    level
  }
});

export const selectLevel = (level: Level) => (dispatch: Dispatch) => {
  const engine: Engine = {ref: ENGINE.LEARNER, version: ENGINE_VERSION};
  // @todo use universalRef
  const content: Content = {type: CONTENT_TYPE.LEVEL, ref: level.ref};
  const engineConfig: EngineConfig = {
    version: ENGINE_CONFIG_VERSION,
    livesDisabled: level.infiniteLives
  };

  dispatch(selectContent({level}));
  dispatch(createProgression(engine, content, engineConfig));
};

export const selectChapter = (chapter: Chapter) => (dispatch: Dispatch) => {
  const engine: Engine = {ref: ENGINE.MICROLEARNING, version: ENGINE_VERSION};
  const content: Content = {type: CONTENT_TYPE.CHAPTER, ref: chapter.universalRef};
  const engineConfig: EngineConfig = {version: ENGINE_CONFIG_VERSION};

  dispatch(selectContent({chapter}));
  dispatch(createProgression(engine, content, engineConfig));
};
