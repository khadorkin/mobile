import {by, expect, element} from 'detox';
import {
  reloadApp,
  bypassAuthentication,
  bypassNotifyMeScreen,
  tapCardOnList,
  waitForExist,
  waitForVisible,
  // waitForNotVisible
} from './utils';

describe('Lesson', () => {
  beforeAll(async () => {
    await reloadApp();
    await bypassAuthentication();
    await bypassNotifyMeScreen();
  });

  describe('More than 1 resource', () => {
    it('should see catalog and choose a discipline', async () => {
      await waitForExist('catalog-section-recommended-items');
      await tapCardOnList('catalog-section-recommended-items', 'basic-dis-1', 1, 2, true);
    });

    // it('should see lesson tab icon with notification', async () => {
    //   await expect(element(by.id('lesson-notification'))).toBeVisible();
    // });

    it('should be redirected to lesson tab', async () => {
      await element(by.id('lesson-tab')).tap();
      await waitForVisible('lesson-screen');
    });

    it('should see resources browser', async () => {
      await expect(element(by.id('resources-browser'))).toExist();
    });

    it('should see a stars note', async () => {
      await expect(element(by.id('additional-stars-note'))).toBeVisible();
    });

    it('should see the first resource selected', async () => {
      await expect(element(by.id('resource-les-1-selected'))).toBeVisible();
      await expect(element(by.id('resource-les-1-thumbnail'))).toBeVisible();
      await expect(element(by.id('resource-les-1-thumbnail-preview-container'))).toBeVisible();
      await expect(element(by.id('resource-les-1-description'))).toBeVisible();
      await expect(element(by.id('lesson-resource-preview-video'))).toBeVisible();
    });
  });

  describe('Browser', () => {
    it('should scroll to pdf resource', async () => {
      await element(by.id('resources')).swipe('up');
      await expect(element(by.id('resource-les-4'))).toBeVisible();
      await expect(element(by.id('resource-les-4-thumbnail'))).toBeVisible();
      await expect(element(by.id('resource-les-4-thumbnail-preview-container'))).toExist();
      await expect(element(by.id('resource-les-4-description'))).toExist();
    });

    it('should be able to select the pdf resource', async () => {
      await element(by.id('resource-les-4')).tap();
      await expect(element(by.id('resource-les-4-selected'))).toBeVisible();
      await expect(element(by.id('resource-les-4-thumbnail'))).toBeVisible();
      await expect(element(by.id('resource-les-4-thumbnail-preview-container'))).toBeVisible();
      await expect(element(by.id('resource-les-4-description'))).toBeVisible();
      await expect(element(by.id('lesson-resource-pdf'))).toBeVisible();
    });
  });

  describe('1 resource only', () => {
    beforeAll(async () => {
      await element(by.id('question-header-back')).tap();
      await tapCardOnList('catalog-section-recommended-items', 'adaptive-dis-1', 1, 1);
      await element(by.id('lesson-tab')).tap();
    });

    it('should be redirected to lesson tab', async () => {
      await element(by.id('lesson-tab')).tap();
      await waitForVisible('lesson-screen');
    });

    it('should not see resources browser', async () => {
      await expect(element(by.id('resources-browser'))).toBeNotVisible();
    });
  });

  describe('Without resource', () => {
    beforeAll(async () => {
      await element(by.id('question-header-back')).tap();
      await tapCardOnList('catalog-section-recommended-items', 'with-pdf-context-dis-2', 1, 5);
    });

    it('should not be redirected to lesson tab', async () => {
      await element(by.id('lesson-tab')).tap();
      await expect(element(by.id('lesson-screen'))).toBeNotVisible();
    });
  });
});
