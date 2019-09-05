// @flow strict

import {createUser} from '../__fixtures__/user';
import type {DataLayer} from '../layer/data';
import createService from './users';

describe('User service', () => {
  it('find', () => {
    const TOKEN = '__TOKEN__';
    const USER = createUser();

    const fetchUser = jest.fn();
    fetchUser.mockImplementationOnce(
      (token => {
        expect(token).toEqual(TOKEN);
        return Promise.resolve(USER);
      }: $PropertyType<DataLayer, 'fetchUser'>)
    );

    // $FlowFixMe
    const service = createService({fetchUser});

    return expect(service.find(TOKEN)).resolves.toEqual(USER);
  });
  it('find', () => {
    const TOKEN = '__TOKEN__';

    const fetchUser = jest.fn();
    fetchUser.mockImplementationOnce(
      (token => {
        expect(token).toEqual(TOKEN);
        return Promise.reject(new Error());
      }: $PropertyType<DataLayer, 'fetchUser'>)
    );

    // $FlowFixMe
    const service = createService({fetchUser});

    return expect(service.find(TOKEN)).rejects.toThrow(new Error());
  });
});
