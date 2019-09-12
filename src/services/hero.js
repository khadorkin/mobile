// @flow strict

import type {DataLayer} from '../layer/data';
import aggregate from '../modules/progression-aggregation-by-content/aggregate';

export type HeroService = {|
  get: () => Promise<DisciplineCard | ChapterCard | void>
|};

const get = async (dataLayer: DataLayer) => {
  const {fetchRecommendation, getHeroContent, getAllProgressions} = dataLayer;
  const progressions = await getAllProgressions();
  const aggregations = aggregate(progressions);
  return getHeroContent(aggregations, fetchRecommendation);
};

const service = (dataLayer: DataLayer): HeroService => ({
  get: get(dataLayer)
});

export default service;
