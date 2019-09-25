// @flow

import AsyncStorage from '@react-native-community/async-storage';

import {createProgressionAPI} from '../../__fixtures__/progression';
import {getAggregationsByContent} from './progressions';

const mockProgressionsStorage = progressions => {
  AsyncStorage.getAllKeys = jest
    .fn()
    .mockImplementation(() => Promise.resolve(progressions.map(p => `progression_${p._id}`)));

  AsyncStorage.multiGet = jest
    .fn()
    .mockImplementation(keys =>
      Promise.resolve(progressions.map(p => [`progression_${p._id}`, JSON.stringify(p)]))
    );
};

describe('progression aggregation', () => {
  it('shoud get aggregate 2 progressions with same content', async () => {
    const progression1 = createProgressionAPI({
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
      },
      meta: {
        createdAt: '2018-09-18T12:05:22.981Z',
        updatedAt: '2018-09-18T12:05:22.981Z'
      }
    });

    const progression2 = createProgressionAPI({
      _id: 'progression2',
      engine: 'learner',
      progressionContent: {
        ref: 'foo',
        type: 'chapter'
      },
      meta: {
        createdAt: '2019-09-18T12:05:22.981Z',
        updatedAt: '2019-09-18T12:05:22.981Z'
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
        updatedAt: progression2.meta.updatedAt
      }
    ]);
  });

  it('shoud get aggregate many progressions with different contents', async () => {
    const progression1 = createProgressionAPI({
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
      meta: {
        createdAt: '2018-09-18T12:05:22.981Z',
        updatedAt: '2018-09-18T12:05:22.981Z'
      }
    });

    const progression2 = createProgressionAPI({
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
      meta: {
        createdAt: '2019-09-18T12:05:22.981Z',
        updatedAt: '2019-09-18T12:05:22.981Z'
      }
    });

    const progression3 = createProgressionAPI({
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
      meta: {
        createdAt: '2018-09-18T12:05:22.981Z',
        updatedAt: '2018-09-18T12:05:22.981Z'
      }
    });

    const progression4 = createProgressionAPI({
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
      meta: {
        createdAt: '2019-09-18T12:05:22.981Z',
        updatedAt: '2019-09-18T12:05:22.981Z'
      }
    });

    const progressions = [progression1, progression2, progression3, progression4];
    mockProgressionsStorage(progressions);

    const result = await getAggregationsByContent();

    expect(result).toEqual([
      {
        content: {version: '1', ref: 'foo', type: 'chapter'},
        // $FlowFixMe state.step IS defined
        latestNbQuestions: progression1.state.step.current - 1,
        success: true,
        stars: 14,
        updatedAt: progression2.meta.updatedAt
      },
      {
        content: {version: '1', ref: 'bar', type: 'chapter'},
        // $FlowFixMe state.step IS defined
        latestNbQuestions: progression3.state.step.current - 1,
        success: false,
        stars: 0,
        updatedAt: progression4.meta.updatedAt
      }
    ]);
  });
});
