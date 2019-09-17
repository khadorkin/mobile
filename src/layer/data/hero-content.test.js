// @flow

import Promise from 'bluebird';
import noop from 'lodash/fp/noop';
import type {ProgressionAggregationByContent} from './_types';
import {getHeroContent} from './hero-content';

type DefaultAggreationSetup = {
  success?: boolean,
  contentRef?: string,
  latestNbQuestions?: number,
  stars?: number,
  updatedAt?: string
};

const createAggregation = ({
  success = true,
  contentRef = 'foo',
  latestNbQuestions = 10,
  stars = 0,
  updatedAt = '2019-05-23T16:10:38.486Z'
}: DefaultAggreationSetup = {}): ProgressionAggregationByContent => ({
  content: {
    ref: contentRef,
    type: 'chapter',
    version: '1'
  },
  stars,
  success,
  latestNbQuestions,
  updatedAt
});

describe('Hero-Engine', function() {
  describe('No content', function() {
    it('should return "null" when no progression is started', async function() {
      expect(await getHeroContent([], noop, noop)).toEqual(null);
    });

    it('should return "null" when all started progressions are successful, and no recommendation is found', async function() {
      const hero = await getHeroContent(
        [
          createAggregation({
            contentRef: 'foo',
            success: true
          }),
          createAggregation({
            contentRef: 'bar',
            success: true
          })
        ],
        noop,
        noop
      );

      expect(hero).toEqual(null);
    });
  });

  describe('Recommendation', function() {
    it('should return "recommendation" when all started progressions are successful', async function() {
      const reco = {
        ref: 'reco',
        type: 'chapter',
        version: '1'
      };
      const fetchRecommendations = () => Promise.resolve(reco);
      const hero = await getHeroContent(
        [
          createAggregation({
            contentRef: 'foo',
            success: true
          }),
          createAggregation({
            contentRef: 'bar',
            success: true
          })
        ],
        fetchRecommendations,
        noop
      );

      expect(hero).toEqual(reco);
    });

    it('should return "recommendation" if no started content have at least 3 questions answered', async function() {
      const completions = [
        createAggregation({
          contentRef: 'notMe | success: true',
          success: true
        }),
        createAggregation({
          contentRef: 'notMeEither | latestNbQuestions < 3',
          latestNbQuestions: 2,
          success: false
        }),
        createAggregation({
          contentRef: 'stillNotMe | date 2018',
          updatedAt: '2018-05-23T16:10:38.486Z',
          latestNbQuestions: 1,
          success: false
        })
      ];
      const reco = {
        ref: 'reco',
        type: 'chapter',
        version: '1'
      };
      const fetchRecommendations = () => Promise.resolve(reco);
      const fetchCard = () => Promise.resolve(undefined);

      const hero = await getHeroContent(completions, fetchRecommendations, fetchCard);

      expect(hero).toEqual(reco);
    });
  });

  describe('Recent content', function() {
    it('should return "the most recent content", not finished, having 3 or more questions answered', async function() {
      const completions = [
        createAggregation({
          contentRef: 'notMe | success: true',
          success: true
        }),
        createAggregation({
          contentRef: 'notMeEither | latestNbQuestions < 3',
          latestNbQuestions: 2,
          success: false
        }),
        createAggregation({
          contentRef: 'stillNotMe | date 2018',
          updatedAt: '2018-05-23T16:10:38.486Z',
          latestNbQuestions: 12,
          success: false
        }),
        createAggregation({
          contentRef: 'me!',
          updatedAt: '2019-05-23T16:10:38.486Z',
          latestNbQuestions: 10,
          success: false
        })
      ];

      const hero = await getHeroContent(completions, noop, noop);

      expect(hero).toEqual({
        ref: 'me!',
        type: 'chapter',
        version: '1'
      });
    });
  });
});
