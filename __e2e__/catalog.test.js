// @flow strict

// import {sleep} from '../src/utils/tests';
import utils from './utils';

describe('Catalog', () => {
  beforeAll(async () => {
    await utils.reloadApp();
  });

  describe('Catalog item', () => {
    it('should be able to see lesson picture/title/author/badge/adaptive/certified', async () => {
      await waitFor(element(by.id('catalog-item-adaptive-dis-1'))).toBeVisible();
      await weExpect(element(by.id('title-catalog-item-adaptive-dis-1'))).toBeVisible();
      await weExpect(element(by.id('subtitle-catalog-item-adaptive-dis-1'))).toBeVisible();
      await weExpect(element(by.id('certified-catalog-item-adaptive-dis-1'))).toBeVisible();
      await weExpect(element(by.id('progressBar-catalog-item-adaptive-dis-1'))).toBeVisible();
      await weExpect(element(by.id('infinite-catalog-item-adaptive-dis-1'))).toBeVisible();
      await weExpect(element(by.id('author-catalog-item-adaptive-dis-1'))).toBeVisible();
      await weExpect(element(by.id('background-image-catalog-item-adaptive-dis-1'))).toBeVisible();
    });
    // Author should be not visible but can't scroll to the last card which match the constraints
    it('should be able to see lesson picture/title/author/noBadge/notAdaptive/notCertified', async () => {
      await waitFor(element(by.id('catalog-item-basic-dis-1'))).toBeVisible();
      await weExpect(element(by.id('title-catalog-item-basic-dis-1'))).toBeVisible();
      await weExpect(element(by.id('subtitle-catalog-item-basic-dis-1'))).toBeVisible();
      await weExpect(element(by.id('certified-catalog-item-basic-dis-1'))).toBeNotVisible();
      await weExpect(element(by.id('progressBar-catalog-item-basic-dis-1'))).toBeVisible();
      await weExpect(element(by.id('infinite-catalog-item-basic-dis-1'))).toBeNotVisible();
      await weExpect(element(by.id('author-catalog-item-basic-dis-1'))).toBeVisible();
      await weExpect(element(by.id('background-image-catalog-item-basic-dis-1'))).toBeVisible();
    });
    // can't have swipe/scroll working to test the last card
    /*
    it('should be able to see lesson picture/title/author/noBadge/notAdaptive/notCertified', async () => {
      await waitFor(element(by.id('catalog-item-1'))).toBeVisible();
      await element(by.id('home')).swipe('up');

      await weExpect(element(by.id('background-image-item-6'))).toBeVisible();
      await weExpect(element(by.id('title-catalog-item-6'))).toBeVisible();
      await weExpect(element(by.id('subtitle-catalog-item-6'))).toBeVisible();
      await weExpect(element(by.id('certified-catalog-item-6'))).toBeNotVisible();
      await weExpect(element(by.id('progressBar-catalog-item-6'))).toBeVisible();
      await weExpect(element(by.id('infinite-catalog-item-6'))).toBeNotVisible();
      await weExpect(element(by.id('author-catalog-item-6'))).toBeNotVisible();
    });*/
  });
});
