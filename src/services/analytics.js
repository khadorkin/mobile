// @flow
import type {AnalyticsService} from '@coorpacademy/player-services';
import type {Progression, Config} from '@coorpacademy/progression-engine';
import type {Lesson} from '../layer/data/_types';

const sendViewedMediaAnalytics = (resource: Lesson, location: string) => {};
const sendProgressionAnalytics = (currentProgression: Progression, engineConfig: Config) => {};

const service: AnalyticsService = {
  sendViewedMediaAnalytics,
  sendProgressionAnalytics
};

export default service;
