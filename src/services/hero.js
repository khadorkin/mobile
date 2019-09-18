// @flow strict

import type {DisciplineCard, ChapterCard} from '../layer/data/_types';
import type {DataLayer} from '../layer/data';
import {getAggregationsByContent} from '../layer/data/progressions';

export type HeroService = {|
  get: () => Promise<DisciplineCard | ChapterCard | void>
|};

<<<<<<< HEAD
const get = async (dataLayer: DataLayer) => {
  const {fetchRecommendation, getHeroContent, getAllProgressions} = dataLayer;
  const progressions = await getAllProgressions();
  const aggregations = aggregate(progressions);
  return getHeroContent(aggregations, fetchRecommendation);
=======
const get = (dataLayer: DataLayer) => async () => {
  const {fetchCard, fetchRecommendation, getHeroContent} = dataLayer;
  const aggregations = await getAggregationsByContent();
  return getHeroContent(aggregations, fetchRecommendation, fetchCard);
>>>>>>> moced aggregations within layer/data/progressions
};

const service = (dataLayer: DataLayer): HeroService => ({
  get: get(dataLayer)
});

export default service;
