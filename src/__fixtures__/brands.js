// @flow strict

import type {
  Brand,
  DashboardSection,
  DashboardSectionType,
  DashboardSectionContentType
} from '../types';

export const createDashboardSection = ({
  order,
  display = true,
  type = 'default',
  contentType
}: {
  order: number,
  display?: boolean,
  type?: DashboardSectionType,
  contentType?: DashboardSectionContentType
}): DashboardSection => ({
  order,
  display,
  type,
  contentType
});

export const createDashboardSections = (): {[string]: DashboardSection} => ({
  all: createDashboardSection({order: 5, type: 'theme'}),
  battle: createDashboardSection({order: 1, contentType: 'course'}),
  digital: createDashboardSection({order: 2, contentType: 'all'}),
  skill123: createDashboardSection({order: 4, contentType: 'chapter', type: 'skill'}),
  news: createDashboardSection({order: 3, display: false})
});

export const createBrand = (): Brand => ({
  name: 'mobile',
  host: 'https://mobile-staging.coorpacademy.com',
  contentCategoryName: 'Mobile',
  colors: {
    primary: '#00B0FF'
  },
  images: {
    'logo-mobile':
      'https://static.coorpacademy.com/content/mobile/raw/coorp_logo_infinite-1552063832916.png'
  },
  dashboardSections: createDashboardSections()
});
