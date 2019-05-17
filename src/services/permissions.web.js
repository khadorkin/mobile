// @flow strict

import {PERMISSION_STATUS} from '../const';
import type {PermissionStatus} from '../types';

type PermissionsService = {|
  alert: () => void,
  canOpenSettings: () => Promise<boolean>,
  check: (permission: string) => Promise<PermissionStatus>,
  openSettings: () => Promise<void>,
  request: (permission: string) => Promise<PermissionStatus>
|};

// @todo web
const service: PermissionsService = {
  request: () => Promise.resolve(PERMISSION_STATUS.AUTHORIZED),
  check: () => Promise.resolve(PERMISSION_STATUS.AUTHORIZED),
  canOpenSettings: () => Promise.resolve(false),
  openSettings: () => {
    throw new Error('No settings in web platform.');
  },
  // eslint-disable-next-line no-console
  alert: (...args) => console.log(...args)
};

export default service;
