// @flow strict

import decode from 'jwt-decode';

import fetch from '../../modules/fetch';
import {__E2E__} from '../../modules/environment';
import type {Brand, DashboardSection, JWT} from '../../types';
import {createBrand} from '../../__fixtures__/brands';

export type Config = {|
  brand: {
    name: string,
    baseUrl: string,
    contentCategoryName: string
  },
  dashboardSections: {
    [string]: DashboardSection
  },
  themes: [
    {
      common: {
        primary: string
      },
      images: {
        'logo-mobile': string
      }
    }
  ]
|};

export const fetchBrand = async (token: string): Promise<Brand> => {
  if (__E2E__) {
    return createBrand();
  }

  const jwt: JWT = decode(token);

  const response = await fetch(`${jwt.host}/config`, {
    headers: {
      authorization: token
    }
  });

  const {brand, themes, dashboardSections}: Config = await response.json();

  return {
    name: brand.name,
    host: brand.baseUrl || 'https://mobile-staging.coorpacademy.com',
    contentCategoryName: brand.contentCategoryName,
    colors: {
      primary: themes[0].common.primary
    },
    images: {
      'logo-mobile': themes[0].images['logo-mobile']
    },
    dashboardSections
  };
};

export default {
  fetchBrand
};
