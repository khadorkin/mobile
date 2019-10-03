// @flow

import type {Progression} from '@coorpacademy/progression-engine';
import {createDisciplineCard, createCardLevel} from '../../__fixtures__/cards';
import {createProgression, createState, createAction} from '../../__fixtures__/progression';
import createCompletion from '../../__fixtures__/completion';
import {ForbiddenError} from '../../models/error';
import {CONTENT_TYPE, ENGINE, SPECIFIC_CONTENT_REF} from '../../const';

import {OLDEST_DATE} from '../../utils/progressions';
import type {ProgressionAggregationByContent} from './_types';
import {
  findById,
  getAggregationsByContent,
  getAll,
  save,
  findLast,
  buildLastProgressionKey,
  findBestOf,
  buildCompletionKey,
  mapProgressionToCompletion,
  mergeCompletion,
  storeOrReplaceCompletion
} from './progressions';

describe('Progression', () => {
  describe('buildLastProgressionKey', () => {
    it('should build the lastProgression Key ', () => {
      const engineRef = 'lol';
      const contentRef = 'lipop';
      expect(buildLastProgressionKey(engineRef, contentRef)).toBeDefined();
    });
  });
  describe('findById', () => {
    it('should find a progression by id', async () => {
      const AsyncStorage = require('@react-native-community/async-storage');
      const progressionId = 'fakeProgressionId';
      const fakeProgression = createProgression({
        _id: progressionId,
        engine: ENGINE.LEARNER,
        progressionContent: {
          ref: 'foo',
          type: CONTENT_TYPE.CHAPTER
        }
      });

      AsyncStorage.getItem = jest
        .fn()
        .mockImplementation(() => Promise.resolve(JSON.stringify(fakeProgression)));

      const result = await findById(progressionId);

      expect(result).toEqual(fakeProgression);
    });

    it("should throw error if progression isn't found", async () => {
      const AsyncStorage = require('@react-native-community/async-storage');
      const progressionId = 'fakeProgressionId';
      AsyncStorage.getItem = jest.fn().mockImplementation(() => Promise.resolve());

      await expect(findById(progressionId)).rejects.toThrowError();
    });
  });
  describe('getAll', () => {
    it('should get all the progression items', async () => {
      const progressionId = 'fakeProgressionId';
      const fakeProgression = createProgression({
        _id: progressionId,
        engine: ENGINE.LEARNER,
        progressionContent: {
          ref: 'foo',
          type: CONTENT_TYPE.CHAPTER
        }
      });

      const AsyncStorage = require('@react-native-community/async-storage');

      AsyncStorage.getAllKeys = jest
        .fn()
        .mockImplementation(() => Promise.resolve([`progression_${progressionId}`, 'babababa']));

      AsyncStorage.multiGet = jest.fn().mockImplementation(keys => {
        expect(keys).toEqual([`progression_${progressionId}`]);
        return Promise.resolve([[`progression_${progressionId}`, JSON.stringify(fakeProgression)]]);
      });

      const result = await getAll();

      expect(result).toEqual([fakeProgression]);
    });
  });
  describe('save', () => {
    it('should the progression and the last progression id simultaneously', async () => {
      const progressionId = 'fakeProgressionId';
      const fakeProgression = createProgression({
        _id: progressionId,
        engine: ENGINE.LEARNER,
        progressionContent: {
          ref: 'foo',
          type: CONTENT_TYPE.CHAPTER
        }
      });
      const AsyncStorage = require('@react-native-community/async-storage');

      AsyncStorage.setItem = jest
        .fn()
        .mockImplementationOnce((key, value) => {
          expect(key).toBe('progression_fakeProgressionId');
          expect(JSON.parse(value)).toEqual(fakeProgression);
        })
        .mockImplementationOnce((key, value) => {
          expect(key).toBe('last_progression_learner_foo');
          expect(value).toBe(fakeProgression._id);
        });

      const result = await save(fakeProgression);
      expect(result).toEqual(fakeProgression);
    });
    it('should add createAt in each action', async () => {
      const progressionId = 'fakeProgressionId';
      const fakeProgression = createProgression({
        _id: progressionId,
        engine: ENGINE.LEARNER,
        progressionContent: {
          ref: 'foo',
          type: CONTENT_TYPE.CHAPTER
        },
        actions: [createAction({}), createAction({})]
      });

      const AsyncStorage = require('@react-native-community/async-storage');
      AsyncStorage.setItem = jest.fn();

      const result = await save(fakeProgression);

      expect(result.actions).toHaveLength(2);
      result.actions &&
        result.actions.forEach(action => {
          expect(action).toHaveProperty('createdAt');
        });
    });
    it('should throw on progression without _id', async () => {
      const fakeProgression = createProgression({
        engine: ENGINE.LEARNER,
        progressionContent: {
          ref: 'foo',
          type: CONTENT_TYPE.CHAPTER
        }
      });

      const AsyncStorage = require('@react-native-community/async-storage');
      AsyncStorage.setItem = jest.fn().mockImplementation(() => {});

      const result = save(fakeProgression);

      await expect(result).rejects.toBeInstanceOf(TypeError);
    });
  });
  describe('findLast', () => {
    it('should find the last progression', async () => {
      const progressionId = 'fakeProgressionId';
      const engine = ENGINE.LEARNER;
      const progressionContent = {
        ref: 'foo',
        type: CONTENT_TYPE.CHAPTER
      };

      const nextContent = {
        ref: 'bar',
        type: 'discipline'
      };

      const state = createState({nextContent});
      const fakeProgression = createProgression({
        _id: progressionId,
        engine,
        progressionContent,
        state
      });

      const AsyncStorage = require('@react-native-community/async-storage');
      AsyncStorage.getItem = jest.fn().mockImplementation(key => {
        if (key === `progression_${progressionId}`) {
          return Promise.resolve(progressionId);
        }
        return Promise.resolve(JSON.stringify(fakeProgression));
      });

      const result = await findLast(engine, progressionContent.ref);

      expect(result).toEqual(fakeProgression);
    });

    it('should find the last progression -- without retrieved progression id', async () => {
      const AsyncStorage = require('@react-native-community/async-storage');
      AsyncStorage.getItem = jest.fn().mockImplementation(() => null);
      const result = await findLast('tata', 'toto');
      expect(result).toEqual(null);
    });

    it('should find the last progression -- without retrieved progression', async () => {
      const progressionId = 'fakeProgressionId';
      const engine = ENGINE.LEARNER;
      const progressionContent = {
        ref: 'foo',
        type: CONTENT_TYPE.CHAPTER
      };

      const AsyncStorage = require('@react-native-community/async-storage');
      AsyncStorage.getItem = jest.fn().mockImplementation(key => {
        if (key === `last_progression_${engine}_${progressionContent.ref}`) {
          return Promise.resolve(progressionId);
        }
        return Promise.resolve();
      });

      const result = await findLast(engine, progressionContent.ref);
      expect(result).toEqual(null);
    });

    it('should find the last progression -- with success as nextContent type', async () => {
      const progressionId = 'fakeProgressionId';
      const engine = ENGINE.LEARNER;
      const progressionContent = {
        ref: 'foo',
        type: CONTENT_TYPE.CHAPTER
      };

      const nextContent = {
        ref: 'bar',
        type: CONTENT_TYPE.SUCCESS
      };
      const fakeProgression = createProgression({
        _id: progressionId,
        engine,
        progressionContent,
        state: {
          nextContent
        }
      });

      const AsyncStorage = require('@react-native-community/async-storage');
      AsyncStorage.getItem = jest.fn().mockImplementation(key => {
        if (key === `progression_${progressionId}`) {
          return Promise.resolve(progressionId);
        }
        return Promise.resolve(JSON.stringify(fakeProgression));
      });

      const result = await findLast(engine, progressionContent.ref);
      expect(result).toEqual(null);
    });

    it('should find the last progression -- with failure as nextContent type', async () => {
      const progressionId = 'fakeProgressionId';
      const engine = ENGINE.LEARNER;
      const progressionContent = {
        ref: 'foo',
        type: CONTENT_TYPE.CHAPTER
      };

      const nextContent = {
        ref: 'bar',
        type: 'failure'
      };
      const fakeProgression = createProgression({
        _id: progressionId,
        engine,
        progressionContent,
        state: {
          nextContent
        }
      });

      const AsyncStorage = require('@react-native-community/async-storage');
      AsyncStorage.getItem = jest.fn().mockImplementation(key => {
        if (key === `progression_${progressionId}`) {
          return Promise.resolve(progressionId);
        }
        return Promise.resolve(JSON.stringify(fakeProgression));
      });

      const result = await findLast(engine, progressionContent.ref);
      expect(result).toEqual(null);
    });

    it('should find the last progression -- with node as nextContent type and extralife as ref', async () => {
      const progressionId = 'fakeProgressionId';
      const engine = ENGINE.LEARNER;
      const progressionContent = {
        ref: 'foo',
        type: CONTENT_TYPE.CHAPTER
      };

      const nextContent = {
        ref: 'extraLife',
        type: 'node'
      };
      const fakeProgression = createProgression({
        _id: progressionId,
        engine,
        progressionContent,
        state: {
          nextContent
        }
      });

      const AsyncStorage = require('@react-native-community/async-storage');
      AsyncStorage.getItem = jest.fn().mockImplementation(key => {
        if (key === `progression_${progressionId}`) {
          return Promise.resolve(progressionId);
        }
        return Promise.resolve(JSON.stringify(fakeProgression));
      });

      const result = await findLast(engine, progressionContent.ref);
      expect(result).toEqual(null);
    });
  });
  describe('synchronize', () => {
    beforeEach(() => {
      jest.resetModules();
      jest.resetAllMocks();
    });
    const TOKEN = '__TOKEN__';
    const HOST = 'https://coorp.mobile.com';
    it('should synchronize progression', async () => {
      jest.mock('cross-fetch');
      const fetch = require('cross-fetch');

      const progressionId = 'fakeProgressionId';
      const engine = ENGINE.LEARNER;
      const progressionContent = {
        ref: 'foo',
        type: CONTENT_TYPE.CHAPTER
      };
      const nextContent = {
        ref: 'bar',
        type: 'discipline'
      };

      const fakeProgression = createProgression({
        _id: progressionId,
        engine,
        progressionContent,
        nextContent
      });

      fetch.mockImplementationOnce((url, options) => {
        expect(url).toBe(`${HOST}/api/v2/progressions`);
        expect(options.method).toBe('POST');
        expect(options.headers).toEqual({
          Authorization: TOKEN,
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest'
        });
        expect({...fakeProgression, ...JSON.parse(options.body)}).toEqual({
          ...fakeProgression,
          meta: {source: 'mobile'}
        });
        return Promise.resolve({
          status: 200,
          statusText: 'OK',
          json: () => Promise.resolve({})
        });
      });

      const AsyncStorage = require('@react-native-community/async-storage');
      AsyncStorage.removeItem = jest.fn().mockImplementation(keys => {
        expect(keys).toEqual(`progression_${progressionId}`);
        return Promise.resolve();
      });

      const {synchronize} = require('./progressions');
      await expect(synchronize(TOKEN, HOST, fakeProgression)).resolves.toBeUndefined();
    });

    it('should throw error if forbidden', async () => {
      jest.mock('cross-fetch');
      const fetch = require('cross-fetch');

      const progressionId = 'fakeProgressionId';
      const engine = ENGINE.LEARNER;
      const progressionContent = {
        ref: 'foo',
        type: CONTENT_TYPE.CHAPTER
      };
      const nextContent = {
        ref: 'bar',
        type: 'discipline'
      };

      const fakeProgression = createProgression({
        _id: progressionId,
        engine,
        progressionContent,
        nextContent
      });

      fetch.mockImplementationOnce((url, options) => {
        return Promise.resolve({
          status: 403,
          statusText: 'Fetch Forbidden',
          json: () => Promise.resolve({})
        });
      });

      const AsyncStorage = require('@react-native-community/async-storage');
      AsyncStorage.removeItem = jest.fn().mockImplementation(keys => {
        expect(keys).toEqual(`progression_${progressionId}`);
        return Promise.resolve();
      });

      const {synchronize} = require('./progressions');
      await expect(synchronize(TOKEN, HOST, fakeProgression)).rejects.toThrow(
        new ForbiddenError('Fetch Forbidden')
      );
    });

    it('should throw error if status code >= 400', async () => {
      jest.mock('cross-fetch');
      const fetch = require('cross-fetch');

      const progressionId = 'fakeProgressionId';
      const engine = ENGINE.LEARNER;
      const progressionContent = {
        ref: 'foo',
        type: CONTENT_TYPE.CHAPTER
      };
      const nextContent = {
        ref: 'bar',
        type: 'discipline'
      };

      const fakeProgression = createProgression({
        _id: progressionId,
        engine,
        progressionContent,
        nextContent
      });

      fetch.mockImplementationOnce((url, options) => {
        return Promise.resolve({
          status: 400,
          statusText: 'Foo bar baz',
          json: () => Promise.resolve({})
        });
      });

      const AsyncStorage = require('@react-native-community/async-storage');
      AsyncStorage.removeItem = jest.fn().mockImplementation(keys => {
        expect(keys).toEqual(`progression_${progressionId}`);
        return Promise.resolve();
      });

      const {synchronize} = require('./progressions');
      await expect(synchronize(TOKEN, HOST, fakeProgression)).rejects.toThrow(
        new Error('Foo bar baz')
      );
    });

    it('should support only progression with _id', async () => {
      const engine = ENGINE.LEARNER;
      const progressionContent = {
        ref: 'foo',
        type: CONTENT_TYPE.CHAPTER
      };
      const nextContent = {
        ref: 'bar',
        type: 'discipline'
      };

      const fakeProgression = createProgression({
        engine,
        progressionContent,
        nextContent
      });

      const {synchronize} = require('./progressions');
      // $FlowFixMe fakeProgression does not need meta for this test
      await expect(synchronize(TOKEN, HOST, fakeProgression)).rejects.toBeInstanceOf(TypeError);
    });

    it('should return the completion key', () => {
      expect(buildCompletionKey('hey', 'ho')).toBeDefined();
    });

    it('should map a progression to a completion -- with provided total', () => {
      const progressionId = 'fakeProgressionId';
      const fakeState = createState({
        stars: 22,
        step: {
          current: 20
        }
      });
      const fakeProgression = createProgression({
        _id: progressionId,
        engine: ENGINE.LEARNER,
        progressionContent: {
          ref: 'foo',
          type: CONTENT_TYPE.CHAPTER
        },
        state: fakeState
      });

      const result = mapProgressionToCompletion(fakeProgression);

      const expectedResult = {
        current: 19,
        stars: 22
      };

      expect(result).toEqual(expectedResult);
    });

    it('should map a progression to a completion -- without provided total', () => {
      const progressionId = 'fakeProgressionId';
      const fakeState = createState({
        stars: 22,
        step: {
          current: 20
        }
      });
      const fakeProgression = createProgression({
        _id: progressionId,
        engine: ENGINE.LEARNER,
        progressionContent: {
          ref: 'foo',
          type: CONTENT_TYPE.CHAPTER
        },
        state: fakeState
      });

      const result = mapProgressionToCompletion(fakeProgression);

      const expectedResult = {
        current: 19,
        stars: 22
      };

      expect(result).toEqual(expectedResult);
    });

    it('should map a progression to a completion -- without state', () => {
      const progressionId = 'fakeProgressionId';

      const fakeProgression = createProgression({
        _id: progressionId,
        engine: ENGINE.LEARNER,
        progressionContent: {
          ref: 'foo',
          type: CONTENT_TYPE.CHAPTER
        }
      });

      expect(() => mapProgressionToCompletion(fakeProgression)).toThrow();
    });

    it('should merge two completion into a single one', () => {
      const completion1 = createCompletion({stars: 899, current: 33});
      const completion2 = createCompletion({stars: 898, current: 22});
      const result = mergeCompletion(completion1, completion2);
      const expectedResult = {stars: 899, current: 22};

      expect(result).toEqual(expectedResult);
    });

    it('should store the completion', async () => {
      const progressionId = 'fakeProgressionId';

      const fakeState = createState({
        stars: 22,
        step: {
          current: 20,
          total: 10
        }
      });

      const fakeProgression = createProgression({
        _id: progressionId,
        engine: ENGINE.LEARNER,
        progressionContent: {
          ref: 'foo',
          type: CONTENT_TYPE.CHAPTER
        },
        state: fakeState
      });

      const AsyncStorage = require('@react-native-community/async-storage');
      AsyncStorage.getItem = jest.fn().mockImplementation(key => {
        return Promise.resolve(undefined);
      });

      AsyncStorage.mergeItem = jest.fn().mockImplementation(key => {
        return Promise.resolve(undefined);
      });

      AsyncStorage.setItem = jest.fn().mockImplementation(key => {
        return Promise.resolve(undefined);
      });

      const expectedResult = {
        stars: fakeState.stars,
        current: 19
      };
      const result = await storeOrReplaceCompletion(fakeProgression);

      expect(result).toEqual(expectedResult);
    });

    it('should update the completion', async () => {
      const progressionId = 'fakeProgressionId';

      const fakeState = createState({
        stars: 22,
        step: {
          current: 20,
          total: 10
        }
      });

      const expectedMaxStarCount = 666;

      const fakeProgression = createProgression({
        _id: progressionId,
        engine: ENGINE.LEARNER,
        progressionContent: {
          ref: 'foo',
          type: CONTENT_TYPE.CHAPTER
        },
        state: fakeState
      });

      const AsyncStorage = require('@react-native-community/async-storage');
      AsyncStorage.getItem = jest.fn().mockImplementation(key => {
        return Promise.resolve(
          JSON.stringify(createCompletion({stars: expectedMaxStarCount, current: 9}))
        );
      });

      AsyncStorage.mergeItem = jest.fn().mockImplementation(key => {
        return Promise.resolve(undefined);
      });

      const expectedResult = {
        stars: expectedMaxStarCount,
        current: 19
      };
      const result = await storeOrReplaceCompletion(fakeProgression);

      expect(result).toEqual(expectedResult);
    });
  });

  describe('findBestOf', () => {
    it('should return a number of stars from an item', async () => {
      const language = 'en',
        progressionId = 'fakeProgressionId',
        engineRef = ENGINE.LEARNER,
        content = {ref: 'foo', type: CONTENT_TYPE.CHAPTER},
        contentRef = 'foo';

      const levelCard = createCardLevel({
        ref: 'mod_yeAh',
        status: 'isActive',
        label: 'Fake level',
        level: 'advanced'
      });
      const disciplineCard = createDisciplineCard({
        ref: 'dis_something',
        completion: 0,
        levels: [levelCard],
        title: 'Second discipline'
      });

      const fakeCardWithStars = {...disciplineCard, stars: 100};

      const AsyncStorage = require('@react-native-community/async-storage');
      AsyncStorage.getItem = jest
        .fn()
        .mockImplementation(() => Promise.resolve(JSON.stringify(fakeCardWithStars)));

      const result = await findBestOf(language)(engineRef, content, contentRef, progressionId);

      expect(result).toEqual(100);
    });
  });
});

const mockProgressionsStorage = (progressions: Array<Progression>) => {
  const AsyncStorage = require('@react-native-community/async-storage');

  AsyncStorage.getAllKeys = jest
    .fn()
    .mockImplementation(() => Promise.resolve(progressions.map(p => `progression_${p._id || ''}`)));

  AsyncStorage.multiGet = jest
    .fn()
    .mockImplementation(keys =>
      Promise.resolve(progressions.map(p => [`progression_${p._id || ''}`, JSON.stringify(p)]))
    );
};

describe('aggregation by content', () => {
  it('should get aggregate 2 progressions with same content, and set an old date when no actions', async () => {
    const progression1 = createProgression({
      _id: 'progression1',
      engine: ENGINE.LEARNER,
      progressionContent: {
        ref: 'foo',
        type: CONTENT_TYPE.CHAPTER
      },
      state: {
        nextContent: {
          ref: SPECIFIC_CONTENT_REF.SUCCESS_EXIT_NODE,
          type: CONTENT_TYPE.SUCCESS
        },
        step: {
          current: 12
        }
      }
    });

    const progression2 = createProgression({
      _id: 'progression2',
      engine: ENGINE.LEARNER,
      progressionContent: {
        ref: 'foo',
        type: CONTENT_TYPE.CHAPTER
      }
    });

    const progressions = [progression1, progression2];
    mockProgressionsStorage(progressions);

    const result = await getAggregationsByContent();
    const expected: Array<ProgressionAggregationByContent> = [
      {
        content: {version: '1', ref: 'foo', type: CONTENT_TYPE.CHAPTER},
        // $FlowFixMe state.step IS defined
        latestNbQuestions: progression1.state.step.current - 1,
        success: true,
        stars: 0,
        updatedAt: OLDEST_DATE
      }
    ];

    expect(result).toEqual(expected);
  });

  it('should aggregate many progressions with different contents', async () => {
    const progression1 = createProgression({
      _id: 'progression1',
      engine: ENGINE.LEARNER,
      progressionContent: {
        ref: 'foo',
        type: CONTENT_TYPE.CHAPTER
      },
      state: {
        nextContent: {
          ref: SPECIFIC_CONTENT_REF.SUCCESS_EXIT_NODE,
          type: CONTENT_TYPE.SUCCESS
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
      engine: ENGINE.LEARNER,
      progressionContent: {
        ref: 'foo',
        type: CONTENT_TYPE.CHAPTER
      },
      state: {
        nextContent: {
          ref: SPECIFIC_CONTENT_REF.SUCCESS_EXIT_NODE,
          type: CONTENT_TYPE.SUCCESS
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
      engine: ENGINE.MICROLEARNING,
      progressionContent: {
        ref: 'bar',
        type: CONTENT_TYPE.CHAPTER
      },
      state: {
        nextContent: {
          ref: 'slide1',
          type: CONTENT_TYPE.SLIDE
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
      engine: ENGINE.MICROLEARNING,
      progressionContent: {
        ref: 'bar',
        type: CONTENT_TYPE.CHAPTER
      },
      state: {
        nextContent: {
          ref: 'slide4',
          type: CONTENT_TYPE.SLIDE
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
    const expected: Array<ProgressionAggregationByContent> = [
      {
        content: {version: '1', ref: 'foo', type: CONTENT_TYPE.CHAPTER},
        // $FlowFixMe state.step IS defined
        latestNbQuestions: progression2.state.step.current - 1,
        success: true,
        // $FlowFixMe state.stars IS defined
        stars: progression2.state.stars,
        // $FlowFixMe actions[2] IS defined
        updatedAt: progression2.actions[2].createdAt
      },
      {
        content: {version: '1', ref: 'bar', type: CONTENT_TYPE.CHAPTER},
        // $FlowFixMe state.step IS defined
        latestNbQuestions: progression3.state.step.current - 1,
        success: false,
        stars: 0,
        // $FlowFixMe actions[2] IS defined
        updatedAt: progression3.actions[2].createdAt
      }
    ];

    expect(result).toEqual(expected);
  });

  it('should set progressions with no actions as older than others', async () => {
    const progression0 = createProgression({
      _id: 'progression0',
      engine: ENGINE.LEARNER,
      progressionContent: {
        ref: 'foo',
        type: CONTENT_TYPE.CHAPTER
      },
      state: {
        nextContent: {
          ref: SPECIFIC_CONTENT_REF.SUCCESS_EXIT_NODE,
          type: CONTENT_TYPE.SUCCESS
        },
        stars: 24,
        step: {
          current: 17
        }
      }
    });

    const progression1 = createProgression({
      _id: 'progression1',
      engine: ENGINE.LEARNER,
      progressionContent: {
        ref: 'foo',
        type: CONTENT_TYPE.CHAPTER
      },
      state: {
        nextContent: {
          ref: SPECIFIC_CONTENT_REF.SUCCESS_EXIT_NODE,
          type: CONTENT_TYPE.SUCCESS
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
      engine: ENGINE.LEARNER,
      progressionContent: {
        ref: 'foo',
        type: CONTENT_TYPE.CHAPTER
      },
      state: {
        nextContent: {
          ref: SPECIFIC_CONTENT_REF.SUCCESS_EXIT_NODE,
          type: CONTENT_TYPE.SUCCESS
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
    const expected: Array<ProgressionAggregationByContent> = [
      {
        content: {version: '1', ref: 'foo', type: CONTENT_TYPE.CHAPTER},
        // $FlowFixMe state.step IS defined
        latestNbQuestions: progression0.state.step.current - 1,
        success: true,
        // $FlowFixMe state.stars IS defined
        stars: progression0.state.stars,
        // $FlowFixMe actions[2] IS defined
        updatedAt: progression1.actions[2].createdAt
      }
    ];

    expect(result).toEqual(expected);
  });
});
