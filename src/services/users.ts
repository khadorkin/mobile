import type {DataLayer} from '../layer/data';
import type {User, ExternalContentLoginInfo} from '../types';

export type UsersService = {
  find: (token: string) => Promise<User>;
  getNewToken: (host: string, token: string) => Promise<string>;
  getExternalContentLoginInfo: (
    host: string,
    token: string,
    contentRef: string,
  ) => Promise<ExternalContentLoginInfo>;
};

const service = (dataLayer: DataLayer): UsersService => ({
  find: dataLayer.fetchUser,
  getExternalContentLoginInfo: dataLayer.fetchExternalContentLoginInfo,
  getNewToken: dataLayer.fetchNewToken,
});

export default service;
