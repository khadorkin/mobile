import {by, element} from 'detox';
import {
  reloadApp,
  bypassAuthentication,
  bypassNotifyMeScreen,
  tapCardOnList,
  waitForExist,
} from './utils';

describe('Correction: good answer', () => {
  beforeAll(async () => {
    await reloadApp();
    await bypassAuthentication();
    await bypassNotifyMeScreen();
    await waitForExist('catalog-section-recommended-items');
    await tapCardOnList('catalog-section-recommended-items', 'basic-dis-1', 1, 2, true);
    await waitForExist('question');
  });

  it('answer successfully and see correction', async () => {
    await element(by.id('question-screen')).swipe('up');
    await element(by.id('question-choice-2')).tap();
    await element(by.id('button-validate')).tap();
    await waitForExist('correction-success');
    await element(by.id('button-next-question')).tap();
  });
});
