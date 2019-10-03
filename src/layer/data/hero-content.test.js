// @flow

import Promise from 'bluebird';
import noop from 'lodash/fp/noop';
import {createChapterCard} from '../../__fixtures__/cards';
import type {ChapterCard, ProgressionAggregationByContent} from './_types';
import {getHeroContent} from './hero-content';

type DefaultAggregationSetup = {|
  success?: boolean,
  contentRef?: string,
  latestNbQuestions?: number,
  stars?: number,
  updatedAt?: string
|};

const createAggregation = ({
  success = true,
  contentRef = 'foo',
  latestNbQuestions = 10,
  stars = 0,
  updatedAt = '2019-05-23T16:10:38.486Z'
}: DefaultAggregationSetup = {}): ProgressionAggregationByContent => ({
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

describe('HeroContent', () => {
  describe('Recommendation', () => {
    it('should fetchRecommendations when no progression is provided', async () => {
      const fetchRecommendations = jest.fn();
      expect(await getHeroContent([], fetchRecommendations, noop)).toEqual(undefined);
      expect(fetchRecommendations).toHaveBeenCalledTimes(1);
    });

    it('should return "recommendation" when all started progressions are successful', async () => {
      const reco: ChapterCard = createChapterCard({
        ref: 'reco',
        status: 'isStarted',
        title: 'plop',
        completion: 12
      });

      const fetchRecommendations = jest.fn(() => Promise.resolve(reco));
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

      expect(fetchRecommendations).toHaveBeenCalledTimes(1);
      expect(hero).toEqual(reco);
    });

    it('should return "recommendation" if no started content have at least 3 questions answered', async () => {
      const completions: Array<ProgressionAggregationByContent> = [
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
      const reco: ChapterCard = createChapterCard({
        ref: 'reco',
        status: 'isStarted',
        title: 'plop',
        completion: 12
      });

      const fetchRecommendations = jest.fn(() => Promise.resolve(reco));
      const fetchCard = jest.fn();

      const hero = await getHeroContent(completions, fetchRecommendations, fetchCard);

      expect(fetchRecommendations).toHaveBeenCalledTimes(1);
      expect(fetchCard).toHaveBeenCalledTimes(0);
      expect(hero).toEqual(reco);
    });
  });

  describe('Recent content', () => {
    it('should return "the most recent content", not finished, having 3 or more questions answered', async () => {
      const completions: Array<ProgressionAggregationByContent> = [
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
        }),
        createAggregation({
          contentRef: 'stillNotMe | date 2017',
          updatedAt: '2017-05-23T16:10:38.486Z',
          latestNbQuestions: 8,
          success: false
        })
      ];

      const fetchRecommendation = jest.fn();
      const fetchCard = jest.fn();

      await getHeroContent(completions, fetchRecommendation, fetchCard);
      expect(fetchRecommendation).toHaveBeenCalledTimes(0);
      expect(fetchCard).toHaveBeenCalledTimes(1);
      expect(fetchCard).toHaveBeenCalledWith({
        ref: 'me!',
        type: 'chapter',
        version: '1'
      });
    });
  });
});
