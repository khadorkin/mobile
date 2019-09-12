// @flow

import type {Card, ProgressionAggregationByContent} from './_types';
import {fetchCard} from './cards';

const isOnGoing = (aggregation: ProgressionAggregationByContent) =>
  aggregation.success === false && aggregation.latestNbQuestions > 3;

const getHeroContent = async (
  aggregations: Array<ProgressionAggregationByContent>,
  fetchRecommendation: () => Promise<Card>
): Promise<Card> => {
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
  return fetchCard(currentProgression.content);
};

module.exports = {getHeroContent};
