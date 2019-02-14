// @flow strict

import type {Choice} from '@coorpacademy/progression-engine';

export type QuestionChoiceItem = {|
  ...Choice,
  selected?: boolean
|};

export type ResourceType = 'video' | 'pdf';

export type MimeType =
  | 'video/mp4'
  | 'application/vimeo'
  | 'image/jpeg'
  | 'image/png'
  | 'application/pdf'
  | 'application/vimeo';

export type SpaceType = 'micro' | 'tiny' | 'small' | 'base' | 'large' | 'xlarge';

export type CardType = 'tip' | 'keyPoint' | 'correction';

export type DisplayMode = 'card' | 'cover' | 'fullscreen';

export type Question = string;

export type LevelType = 'base' | 'advanced' | 'coach';

export type Progression = {|
  current: number,
  count: number
|};
