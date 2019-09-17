// @flow

import type {DisciplineCard, ChapterCard, ProgressionAggregationByContent} from './_types';

const isOnGoing = (aggregation: ProgressionAggregationByContent) =>
  aggregation.success === false && aggregation.latestNbQuestions > 3;

const getHeroContent = async (
  aggregations: Array<ProgressionAggregationByContent>,
  fetchRecommendation: () => Promise<DisciplineCard | ChapterCard | void>,
  fetchCard: () => Promise<DisciplineCard | ChapterCard | void>
): Promise<DisciplineCard | ChapterCard | void> => {
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
