import {by, expect, element} from 'detox';
// import {sleep} from '../src/utils/tests';
import {
  reloadApp,
  bypassAuthentication,
  bypassNotifyMeScreen,
  tapCardOnList,
  waitForExist,
} from './utils';

describe('Clue', () => {
  beforeAll(async () => {
    await reloadApp({}, true);
    await bypassAuthentication();
    await bypassNotifyMeScreen();
  });

  describe('With clue', () => {
    it('should open the player', async () => {
      await tapCardOnList('catalog-section-recommended-items', 'basic-dis-1', 1, 2, true);
    });

    it('should be able to open the clue tab', async () => {
      await element(by.id('clue-tab')).tap();
      await waitForExist('clue');
      await expect(element(by.id('clue-advice'))).toBeVisible();
      await expect(element(by.id('button-clue'))).toBeVisible();
    });

    // Buggy, should see later
    // it('should be able to reveal the clue', async () => {
    //   await element(by.id('button-clue')).tap();
    //   await sleep(1000);
    //   await expect(element(by.id('clue-advice'))).toBeNotVisible();
    //   await expect(element(by.id('button-clue'))).toBeNotVisible();
    //   await expect(element(by.id('clue-back'))).toBeVisible();
    // });
  });

  describe('Without clue', () => {
    beforeAll(async () => {
      await element(by.id('question-header-back')).tap();
      await tapCardOnList('catalog-section-recommended-items', 'no-clue-dis-1', 1, 6);
    });

    it('should not be able to open the clue tab', async () => {
      await element(by.id('clue-tab')).tap();
      await expect(element(by.id('clue'))).toBeNotVisible();
    });
  });
});
