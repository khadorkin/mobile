// @flow

import * as React from 'react';
import type {Progression, CardDisplayMode, AuthorType, Engine} from '../types';
import type {Chapter, Discipline} from '../layer/data/_types';
import Touchable from './touchable';
import CatalogItemLearner from './catalog-item-learner';
import CatalogItemMicrolearning from './catalog-item-microlearning';

export type Item = Discipline | Chapter;

type CourseInfo = {|
  title: string,
  subtitle: string,
  progression?: Progression,
  image: File | {uri: string},
  badge?: string,
  authorType?: AuthorType,
  authorName?: string,
  isAdaptive: boolean,
  isLearner: boolean,
  isCertified?: boolean
|};

type AnalyticsParams = {|
  universalRef: string,
  type: Engine,
  section: 'finishLearning' | 'forYou' | 'recommendation'
|};

type Props = $Exact<{|
  ...CourseInfo,
  ...AnalyticsParams,
  onPress: (item: Item) => void,
  displayMode?: CardDisplayMode,
  testID: string
|}>;

const CatalogItem = ({isLearner, ...props}: Props) => {
  return (
    <Touchable
      testID={props.testID}
      onPress={props.onPress}
      isHighlight
      analyticsID="card"
      analyticsParams={{ref: props.universalRef, type: props.type, section: props.section}}
    >
      {(isLearner && <CatalogItemLearner {...props} />) || <CatalogItemMicrolearning {...props} />}
    </Touchable>
  );
};

export default CatalogItem;
