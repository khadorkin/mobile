// @flow strict

import {ObjectId} from 'bson';
import {ENGINE, CONTENT_TYPE} from '../../../const';
import {createLevel} from '../../../__fixtures__/levels';
import {createLevelProgression} from './create-level-progression';

jest.mock('@coorpacademy/player-store', () => ({
  createProgression: jest.fn(),
  CONTENT_TYPE: {CHAPTER: 'chapter', LEVEL: 'level'}
}));

const playerStore = require('@coorpacademy/player-store');

describe('createLevelProgression', () => {
  it('should createLevelProgression', async () => {
    const level = createLevel({
      ref: 'lev_1',
      chapterIds: []
    });

    const ENGINE_VERSION = '2';

    // $FlowFixMe
    playerStore.createProgression.mockImplementationOnce((_id, engine, content, engineConfig) => {
      expect(ObjectId.isValid(_id)).toBeTruthy();
      expect(engine).toEqual({ref: ENGINE.LEARNER, version: ENGINE_VERSION});
      expect(content).toEqual({type: CONTENT_TYPE.LEVEL, ref: 'lev_1'});
      expect(engineConfig).toEqual({livesDisabled: false, version: ENGINE_VERSION});
      return {type: '@@mock/CREATE_PROGRESSION', payload: {_id: '__ID__'}};
    });

    // $FlowFixMe
    const actual = await createLevelProgression(level, ENGINE_VERSION);

    expect(playerStore.createProgression).toHaveBeenCalledTimes(1);
    expect(actual).toEqual({type: '@@mock/CREATE_PROGRESSION', payload: {_id: '__ID__'}});
  });
  afterEach(() => {
    // $FlowFixMe
    playerStore.createProgression.mockReset();
  });
  afterEach(() => {
    // $FlowFixMe
    playerStore.createProgression.mockReset();
  });
});
