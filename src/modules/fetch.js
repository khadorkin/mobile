// @flow strict

import _fetch from 'cross-fetch';

import {ForbiddenError} from '../models/error';

export const ERROR_MESSAGE = `The "mobile" feature is currently unavailable on your platform`;

const fetch: typeof _fetch = async (...args) => {
  const headers = args[1] && args[1].headers;

  const newHeaders = {
    ...headers,
    'X-Requested-With': 'XMLHttpRequest'
  };

  const newArgs = [args[0], {...args[1], headers: newHeaders}];

  const response = await _fetch(...newArgs);

  if (response && response.status === 403) {
    try {
      const result = await response.json();
      if (result && result.err === ERROR_MESSAGE) {
        throw new ForbiddenError('Fetch Forbidden');
      }
    } catch (e) {
      throw new Error(e.message);
    }
  }

  return response;
};

export default fetch;
