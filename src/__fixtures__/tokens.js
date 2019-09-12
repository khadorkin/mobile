// @flow

import {ROLES} from '@coorpacademy/acl';

const toJWT = <S>(payload: S): string =>
  ['', Buffer.from(JSON.stringify(payload) || '').toString('base64'), ''].join('.');

export const createToken = ({
  user = 'foobar',
  host,
  iss = 'coorpacademy-jwt',
  roles = [ROLES.USER],
  brand = 'onboarding'
}: {
  user?: string,
  host?: string | null,
  iss?: string,
  roles?: Array<string>,
  brand?: string
}): string =>
  toJWT({
    host: host === null ? undefined : host || 'https://domain.tld',
    user,
    iss,
    grants: {
      [brand]: {
        roles
      }
    },
    exp: 1,
    iat: 1,
    usage: 'test'
  });
