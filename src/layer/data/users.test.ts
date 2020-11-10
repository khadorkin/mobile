import {createToken} from '../../__fixtures__/tokens';
import {createBrand} from '../../__fixtures__/brands';
import {createUser} from '../../__fixtures__/user';
import {fakeError} from '../../utils/tests';
import type {FetchUserResponse} from './users';

const brand = createBrand();
const token = createToken({host: brand.host});

const user = createUser();

const fetchedUser: FetchUserResponse = {
  name: {
    givenName: user.givenName,
    familyName: user.familyName,
  },
  displayName: user.displayName,
};

describe('Users', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  describe('fetchUser', () => {
    it('should fetch e2e fixtures', () => {
      jest.mock('../../modules/environment', () => ({
        __E2E__: true,
      }));
      const {fetchUser} = require('./users');
      const actual = fetchUser(token);
      const expected = user;
      return expect(actual).resolves.toEqual(expected);
    });

    it('should fetch config and return user', () => {
      jest.mock('../../modules/environment', () => ({
        __E2E__: false,
      }));
      const fetch = require('cross-fetch');

      fetch.mockImplementationOnce(
        (
          url,
          options,
        ): Promise<{
          json: () => Promise<FetchUserResponse>;
        }> => {
          expect(url).toBe(`${brand.host}/api/v1/users/me`);

          expect(options).toHaveProperty('headers.authorization', token);

          return Promise.resolve({
            json: () => Promise.resolve(fetchedUser),
          });
        },
      );

      const {fetchUser} = require('./users');
      const actual = fetchUser(token);
      const expected = user;
      return expect(actual).resolves.toEqual(expected);
    });

    it('should reject error', () => {
      jest.mock('../../modules/environment', () => ({
        __E2E__: false,
      }));
      const fetch = require('cross-fetch');

      fetch.mockImplementationOnce((url, options) => Promise.reject(fakeError));

      const {fetchUser} = require('./users');
      const actual = fetchUser(token);

      return expect(actual).rejects.toThrow();
    });
  });

  describe('fetchExternalContentLoginInfo', () => {
    it('fetches the info for a given external content', async () => {
      const fetch = require('cross-fetch');
      const TOKEN = '__TOKEN__';
      const HOST = 'https://coorp.mobile.com';

      fetch.mockImplementationOnce((url, options) => {
        expect(url).toBe(
          `${HOST}/api/v1/users/me/login-token?redirectTo=%2FexternalContent%2FextCont_123%3FshowHeaderFooter%3Dfalse&maxUsage=9000000`,
        );

        expect(options).toHaveProperty('headers.authorization', TOKEN);

        return Promise.resolve({
          json: () =>
            Promise.resolve({loginUrl: 'https://somefakeurl.it', token: 'eygeetI234jfToken'}),
        });
      });

      const {fetchExternalContentLoginInfo} = require('./users');
      const actual = await fetchExternalContentLoginInfo(HOST, TOKEN, 'extCont_123');
      expect(actual).toEqual({
        loginUrl: 'https://somefakeurl.it',
        token: 'eygeetI234jfToken',
      });
    });
  });

  describe('fetchNewToken', () => {
    it('fetches a new token for current user', async () => {
      const fetch = require('cross-fetch');
      const TOKEN = '__TOKEN__';
      const HOST = 'https://coorp.mobile.com';

      fetch.mockImplementationOnce((url, options) => {
        expect(url).toBe(`${HOST}/api/v1/users/me/mobile/token`);

        expect(options).toHaveProperty('headers.authorization', TOKEN);

        return Promise.resolve({
          text: () => Promise.resolve('eygeetI234jfToken'),
        });
      });

      const {fetchNewToken} = require('./users');
      const actual = await fetchNewToken(HOST, TOKEN);
      expect(actual).toEqual('eygeetI234jfToken');
    });
  });

  afterAll(() => {
    jest.resetAllMocks();
  });
});
