// @flow strict

import type {DisciplineCard, ChapterCard} from '../layer/data/_types';
import type {DataLayer} from '../layer/data';
import {getAggregationsByContent} from '../layer/data/progressions';

export type HeroService = {|
  get: () => Promise<DisciplineCard | ChapterCard | void>
|};

const get = (
  dataLayer: DataLayer
): (() => Promise<DisciplineCard | ChapterCard | void>) => async (): Promise<
  DisciplineCard | ChapterCard | void
> => {
  const aggregations = await getAggregationsByContent();
  if (aggregations.length === 0) {
    return undefined;
  }

  const {fetchCard, fetchRecommendation, getHeroContent} = dataLayer;
  return getHeroContent(aggregations, fetchRecommendation, fetchCard);
};

const service = (dataLayer: DataLayer): HeroService => ({
  get: get(dataLayer)
});

export default service;
