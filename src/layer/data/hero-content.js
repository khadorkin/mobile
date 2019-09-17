// @flow

import type {Content} from '@coorpacademy/progression-engine';
import type {DisciplineCard, ChapterCard, ProgressionAggregationByContent} from './_types';

const isOnGoing = (aggregation: ProgressionAggregationByContent) =>
  aggregation.success === false && aggregation.latestNbQuestions > 3;

export const getHeroContent = async (
  aggregations: Array<ProgressionAggregationByContent>,
  fetchRecommendation: () => Promise<DisciplineCard | ChapterCard | void>,
  fetchCard: Content => Promise<DisciplineCard | ChapterCard | void>
): Promise<DisciplineCard | ChapterCard | void> => {
  if (aggregations.length === 0) {
    return undefined;
  }
  const onGoingProgressions = aggregations.filter(isOnGoing);

  if (onGoingProgressions.length === 0) {
    const recommendation = await fetchRecommendation();
    return recommendation || undefined;
  }

  onGoingProgressions.sort((a, b) => (a.updatedAt < b.updatedAt ? 1 : -1));

  const currentProgression = onGoingProgressions[0];
  return fetchCard(currentProgression.content);
};
