import {CARD_TYPE} from '../layer/data/_const';
import {Card, ExternalContentCard, ExternalContentType} from '../layer/data/_types';

export const uniqBy = <O>(mapper: (obj: O) => string, array: Array<O>): Array<O> => [
  ...array
    .reduce((acc, cur) => {
      const key = mapper(cur);
      if (!acc.has(key)) acc.set(key, cur);
      return acc;
    }, new Map())
    .values(),
];

export const isExternalContent = (item: Card): boolean => {
  return [CARD_TYPE.ARTICLE, CARD_TYPE.PODCAST, CARD_TYPE.VIDEO, CARD_TYPE.SCORM].includes(
    (item as ExternalContentCard)?.type,
  );
};

export const getExternalContentColor = (type: ExternalContentType): string => {
  const EXTERNAL_CONTENT_COLORS = {
    scorm: '#FFB800',
    article: '#365FCD',
    video: '#E8335E',
    podcast: '#432ba7',
  } as const;
  return EXTERNAL_CONTENT_COLORS[type];
};
