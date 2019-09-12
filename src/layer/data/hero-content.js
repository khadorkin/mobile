// @flow

import type {ProgressionAggregationByContent} from './_types';

const isOnGoing = (aggregation: ProgressionAggregationByContent) =>
  aggregation.success === false && aggregation.latestNbQuestions > 3;

const heroContent = async (
  aggregations: Array<ProgressionAggregationByContent>,
  // eslint-disable-next-line flowtype/no-weak-types
  fetchRecommendation: Function
) => {
  if (aggregations.length === 0) {
    return null;
  }
  const onGoingProgressions = aggregations.filter(isOnGoing);

  if (onGoingProgressions.length === 0) {
    const recommendation = await fetchRecommendation();
    return recommendation || null;
  }

  onGoingProgressions.sort((a, b) => (a.updatedAt < b.updatedAt ? 1 : -1));

  const currentProgression = onGoingProgressions[0];
  return currentProgression.content;
};

module.exports = {heroContent};
