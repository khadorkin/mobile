// @flow strict

import {ENGINE, CONTENT_TYPE} from '../const';
import {createProgression, createState, createAction} from '../__fixtures__/progression';
import {isDone, sortProgressionChronologicaly} from './progressions';

describe.only('progressionUtils', () => {
  it('isDone should detect if progression is done', () => {
    const progression = createProgression({
      engine: ENGINE.LEARNER,
      progressionContent: {ref: 'mod_1', type: CONTENT_TYPE.LEVEL}
    });

    expect(isDone({...progression, state: undefined})).toBe(false);
    expect(
      isDone({
        ...progression,
        state: createState({nextContent: {ref: 'sli_1', type: CONTENT_TYPE.SLIDE}})
      })
    ).toBe(false);
    expect(
      isDone({
        ...progression,
        state: createState({nextContent: {ref: 'ext_1', type: CONTENT_TYPE.NODE}})
      })
    ).toBe(false);

    expect(
      isDone({
        ...progression,
        state: createState({nextContent: {ref: 'success', type: CONTENT_TYPE.SUCCESS}})
      })
    ).toBe(true);
    expect(
      isDone({
        ...progression,
        state: createState({nextContent: {ref: 'failure', type: CONTENT_TYPE.FAILURE}})
      })
    ).toBe(true);
  });

  it('should sort progressions', () => {
    const extraOldAction = createAction({createdAt: '1994-09-18T08:41:37.004Z'});
    const newerAction = createAction({createdAt: '2019-09-18T08:41:37.004Z'});
    const olderAction = createAction({createdAt: '2000-01-18T08:41:37.004Z'});

    const newerProgression = createProgression({
      _id: 'foo',
      engine: 'learner',
      progressionContent: {
        ref: 'foo',
        type: 'chapter'
      },
      actions: [olderAction, newerAction]
    });

    const extraOldProgression = createProgression({
      _id: 'foo',
      engine: 'learner',
      progressionContent: {
        ref: 'foo',
        type: 'chapter'
      },
      actions: [extraOldAction]
    });

    const expectedResult = [extraOldProgression, newerProgression];
    const result = sortProgressionChronologicaly([newerProgression, extraOldProgression]);
    expect(result).toEqual(expectedResult);
  });
});
