// @flow

import AsyncStorage from '@react-native-community/async-storage';

import {createProgressionAPI} from '../../__fixtures__/progression';
import {getAggregationsByContent} from './progressions';

describe('progression aggregation', () => {
  describe('getAggregationsByContent', () => {
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

      const getProgression = keys => {
        let progression;
        progressions.forEach(p => {
          if (keys.includes(`progression_${p._id}`)) {
            progression = Promise.resolve([[`progression_${p._id}`, JSON.stringify(p)]]);
          }
        });
        return progression;
      };

      AsyncStorage.getAllKeys = jest
        .fn()
        .mockImplementation(() => Promise.resolve([`progression_${progression1._id}`]));

      AsyncStorage.multiGet = jest.fn().mockImplementation(getProgression);

      const result = await getAggregationsByContent();

      expect(result).toEqual([
        {
          content: {version: '1', ref: 'foo', type: 'chapter'},
          latestNbQuestions: 11,
          success: true,
          stars: 0,
          updatedAt: '2019-09-18T12:05:22.981Z'
        }
      ]);
    });
  });
});
