// @flow strict

import type {DataLayer} from '../layer/data';
import type {User} from '../types';

export type UserService = {|
  find: (token: string) => Promise<User>
|};

const service = (dataLayer: DataLayer): UserService => ({
  find: dataLayer.fetchUser
});

export default service;
