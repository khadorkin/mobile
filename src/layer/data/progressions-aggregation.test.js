// @flow

import type {Progression} from '@coorpacademy/progression-engine';
import AsyncStorage from '@react-native-community/async-storage';

import {createAction, createProgression} from '../../__fixtures__/progression';
import {OLDEST_DATE} from '../../utils/progressions';
import {getAggregationsByContent} from './progressions';

const mockProgressionsStorage = (progressions: Array<Progression>) => {
  AsyncStorage.getAllKeys = jest
    .fn()
    .mockImplementation(() => Promise.resolve(progressions.map(p => `progression_${p._id || ''}`)));

  AsyncStorage.multiGet = jest
    .fn()
    .mockImplementation(keys =>
      Promise.resolve(progressions.map(p => [`progression_${p._id || ''}`, JSON.stringify(p)]))
    );
};

describe('progression aggregation', () => {
  it('should get aggregate 2 progressions with same content, and set an old date when no actions', async () => {
    const progression1 = createProgression({
      _id: 'progression1',
      engine: 'learner',
      progressionContent: {
        ref: 'foo',
        type: 'chapter'
      },
      state: {
        nextContent: {
          ref: 'successExitNode',
          type: 'success'
        },
        step: {
          current: 12
        }
      }
    });

    const progression2 = createProgression({
      _id: 'progression2',
      engine: 'learner',
      progressionContent: {
        ref: 'foo',
        type: 'chapter'
      }
    });

    const progressions = [progression1, progression2];
    mockProgressionsStorage(progressions);

    const result = await getAggregationsByContent();

    expect(result).toEqual([
      {
        content: {version: '1', ref: 'foo', type: 'chapter'},
        // $FlowFixMe state.step IS defined
        latestNbQuestions: progression1.state.step.current - 1,
        success: true,
        stars: 0,
        updatedAt: OLDEST_DATE
      }
    ]);
  });

  it('should get aggregate many progressions with different contents', async () => {
    const progression1 = createProgression({
      _id: 'progression1',
      engine: 'learner',
      progressionContent: {
        ref: 'foo',
        type: 'chapter'
      },
      state: {
        nextContent: {
          ref: 'successExitNode',
          type: 'success'
        },
        stars: 4,
        step: {
          current: 12
        }
      },
      actions: [
        createAction({createdAt: '2003-01-18T08:41:37.004Z'}),
        createAction({createdAt: '2002-09-18T08:41:37.004Z'}),
        createAction({createdAt: '2001-09-18T08:41:37.004Z'})
      ]
    });

    const progression2 = createProgression({
      _id: 'progression2',
      engine: 'learner',
      progressionContent: {
        ref: 'foo',
        type: 'chapter'
      },
      state: {
        nextContent: {
          ref: 'successExitNode',
          type: 'success'
        },
        stars: 14,
        step: {
          current: 13
        }
      },
      actions: [
        createAction({createdAt: '2004-09-18T08:41:37.004Z'}),
        createAction({createdAt: '2005-09-18T08:41:37.004Z'}),
        createAction({createdAt: '2006-01-18T08:41:37.004Z'})
      ]
    });

    const progression3 = createProgression({
      _id: 'progression3',
      engine: 'microlearning',
      progressionContent: {
        ref: 'bar',
        type: 'chapter'
      },
      state: {
        nextContent: {
          ref: 'slide1',
          type: 'slide'
        },
        step: {
          current: 13
        }
      },
      actions: [
        createAction({createdAt: '1994-09-18T08:41:37.004Z'}),
        createAction({createdAt: '2000-09-18T08:41:37.004Z'}),
        createAction({createdAt: '2007-01-18T08:41:37.004Z'})
      ]
    });

    const progression4 = createProgression({
      _id: 'progression2',
      engine: 'microlearning',
      progressionContent: {
        ref: 'bar',
        type: 'chapter'
      },
      state: {
        nextContent: {
          ref: 'slide4',
          type: 'slide'
        },
        step: {
          current: 5
        }
      },
      actions: [
        createAction({createdAt: '2002-09-18T08:41:37.004Z'}),
        createAction({createdAt: '2003-09-18T08:41:37.004Z'}),
        createAction({createdAt: '2004-01-18T08:41:37.004Z'})
      ]
    });

    const progressions = [progression1, progression2, progression3, progression4];
    mockProgressionsStorage(progressions);

    const result = await getAggregationsByContent();

    expect(result).toEqual([
      {
        content: {version: '1', ref: 'foo', type: 'chapter'},
        // $FlowFixMe state.step IS defined
        latestNbQuestions: progression2.state.step.current - 1,
        success: true,
        // $FlowFixMe state.stars IS defined
        stars: progression2.state.stars,
        // $FlowFixMe actions[2] IS defined
        updatedAt: progression2.actions[2].createdAt
      },
      {
        content: {version: '1', ref: 'bar', type: 'chapter'},
        // $FlowFixMe state.step IS defined
        latestNbQuestions: progression3.state.step.current - 1,
        success: false,
        stars: 0,
        // $FlowFixMe actions[2] IS defined
        updatedAt: progression3.actions[2].createdAt
      }
    ]);
  });

  it('should set progressions with no actions as older than others', async () => {
    const progression0 = createProgression({
      _id: 'progression0',
      engine: 'learner',
      progressionContent: {
        ref: 'foo',
        type: 'chapter'
      },
      state: {
        nextContent: {
          ref: 'successExitNode',
          type: 'success'
        },
        stars: 24,
        step: {
          current: 17
        }
      }
    });

    const progression1 = createProgression({
      _id: 'progression1',
      engine: 'learner',
      progressionContent: {
        ref: 'foo',
        type: 'chapter'
      },
      state: {
        nextContent: {
          ref: 'successExitNode',
          type: 'success'
        },
        stars: 8,
        step: {
          current: 10
        }
      },
      actions: [
        createAction({createdAt: '2002-09-18T08:41:37.004Z'}),
        createAction({createdAt: '2003-09-18T08:41:37.004Z'}),
        createAction({createdAt: '2004-01-18T08:41:37.004Z'})
      ]
    });

    const progression2 = createProgression({
      _id: 'progression2',
      engine: 'learner',
      progressionContent: {
        ref: 'foo',
        type: 'chapter'
      },
      state: {
        nextContent: {
          ref: 'successExitNode',
          type: 'success'
        },
        stars: 14,
        step: {
          current: 12
        }
      },
      actions: [
        createAction({createdAt: '2000-09-18T08:41:37.004Z'}),
        createAction({createdAt: '2001-09-18T08:41:37.004Z'}),
        createAction({createdAt: '2002-01-18T08:41:37.004Z'})
      ]
    });

    const progressions = [progression0, progression1, progression2];
    // $FlowFixMe _id IS defined
    mockProgressionsStorage(progressions);

    const result = await getAggregationsByContent();

    expect(result).toEqual([
      {
        content: {version: '1', ref: 'foo', type: 'chapter'},
        // $FlowFixMe state.step IS defined
        latestNbQuestions: progression0.state.step.current - 1,
        success: true,
        // $FlowFixMe state.stars IS defined
        stars: progression0.state.stars,
        // $FlowFixMe actions[2] IS defined
        updatedAt: progression1.actions[2].createdAt
      }
    ]);
  });
});
