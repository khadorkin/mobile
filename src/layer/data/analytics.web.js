// @flow strict

import type {AnalyticsEventType, AnalyticsEventParams} from '../../types';
import {ANALYTICS_EVENT_TYPE} from '../../const';

// @todo web
export const logEvent = (event: AnalyticsEventType, params?: AnalyticsEventParams = {}) => {
  if (event === ANALYTICS_EVENT_TYPE.NAVIGATE && params.screenName) {
    const {screenName} = params;
    if (typeof screenName === 'string') {
      // eslint-disable-next-line no-console
      return console.warn('@todo tracking', 'setCurrentScreen', screenName);
    }
  }

  if (event === ANALYTICS_EVENT_TYPE.SIGN_IN) {
    const {userId, brand} = params;
    // eslint-disable-next-line no-console
    return console.warn('@todo tracking', 'setUserProperties', {
      userId,
      brand
    });
  }

  if (event === ANALYTICS_EVENT_TYPE.SIGN_OUT) {
    // To clean the session (unset user properties)
    // eslint-disable-next-line no-console
    return console.warn('@todo tracking', 'setUserProperties', {
      userId: null,
      brand: null
    });
  }

  // eslint-disable-next-line no-console
  return console.warn('@todo tracking', 'logEvent', params);
};

export default {logEvent};
