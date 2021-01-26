import {by, element} from 'detox';
import {
  reloadApp,
  bypassAuthentication,
  bypassNotifyMeScreen,
  waitForVisible,
  waitForNotVisible,
  waitForExist,
  tapCardOnList,
} from './utils';

describe('Correction: fast slide', () => {
  beforeAll(async () => {
    await reloadApp();
    await bypassAuthentication();
    await bypassNotifyMeScreen();
    await tapCardOnList('catalog-section-recommended-items', 'basic-dis-1', 1, 2, true);
  });

  it('should be able to enable fast slide', async () => {
    await waitForVisible('header-slide-right');
    await element(by.id('header-slide-right')).longPress();
    await waitForVisible('header-slide-right-fast-slide');
  });

  it('should answer wrongly and access to level end directly', async () => {
    await element(by.id('question-screen')).swipe('up');
    await element(by.id('question-choice-3')).tap();
    await element(by.id('button-validate')).multiTap(2);
    await waitForVisible('correction-error');
    await element(by.id('button-quit')).multiTap(2);
    await waitForVisible('level-end-error');
  });

  it('should be able to disable fast slide', async () => {
    await element(by.id('button-retry-level')).multiTap(2);
    await waitForVisible('header-slide-right-fast-slide');
    await element(by.id('header-slide-right-fast-slide')).longPress();
    await waitForVisible('header-slide-right');
  });

  it('should answer wrongly and not access to level end', async () => {
    await element(by.id('question-screen')).swipe('up');
    await element(by.id('question-choice-3')).tap();
    await element(by.id('button-validate')).multiTap(2);
    await waitForVisible('correction-error');
    await element(by.id('button-next-question')).multiTap(2);
    await waitForNotVisible('level-end-success');
    await waitForNotVisible('level-end-error');
    await waitForExist('question');
  });
});
