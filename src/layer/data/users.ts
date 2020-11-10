import decode from 'jwt-decode';

import {buildUrlQueryParams} from '../../modules/uri';
import fetch from '../../modules/fetch';
import {__E2E__} from '../../modules/environment';
import type {User, JWT, ExternalContentLoginInfo} from '../../types';
import {createUser} from '../../__fixtures__/user';

export type FetchUserResponse = {
  name: {
    givenName: string;
    familyName: string;
  };
  displayName: string;
};

export const fetchUser = async (token: string): Promise<User> => {
  if (__E2E__) {
    return createUser();
  }

  const jwt: JWT = decode(token);

  const response = await fetch(`${jwt.host}/api/v1/users/me`, {
    headers: {
      authorization: token,
    },
  });

  const {
    displayName,
    name: {givenName, familyName},
  }: FetchUserResponse = await response.json();

  return {
    givenName,
    familyName,
    displayName,
  };
};

export const fetchExternalContentLoginInfo = async (
  host: string,
  token: string,
  contentRef: string,
): Promise<ExternalContentLoginInfo> => {
  const ONE_LOGIN_TOKEN_URL = `${host}/api/v1/users/me/login-token?${buildUrlQueryParams({
    redirectTo: `/externalContent/${contentRef}?showHeaderFooter=false`,
    maxUsage: 9000000,
  })}`;
  const response = await fetch(ONE_LOGIN_TOKEN_URL, {
    method: 'POST',
    headers: {
      authorization: token,
      accept: 'application/json',
    },
  });
  const data = await response.json();
  return data;
};

// Make sure the server exposes this route before using it
export const fetchNewToken = async (host: string, token: string): Promise<string> => {
  const url = `${host}/api/v1/users/me/mobile/token`;
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      authorization: token,
      accept: 'text/plain',
    },
  });
  const data = await response.text();
  return data;
};

export default {
  fetchUser,
  fetchNewToken,
  fetchExternalContentLoginInfo,
};
