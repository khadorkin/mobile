import {by, expect, element} from 'detox';
import {
  reloadApp,
  bypassAuthentication,
  bypassNotifyMeScreen,
  tapCardOnList,
  waitForExist,
  waitForVisible,
} from './utils';

describe('Basic Question', () => {
  beforeAll(async () => {
    await reloadApp();
    await bypassAuthentication();
    await bypassNotifyMeScreen();
  });

  it('should see catalog and choose a discipline', async () => {
    await tapCardOnList('catalog-section-recommended-items', 'question-basic-dis-1', 1, 10, true);
  });

  it('should see the question elements', async () => {
    await waitForExist('question');
    await expect(element(by.id('question-title'))).toBeVisible();
    await expect(element(by.id('explanation'))).toBeVisible();
    await expect(element(by.id('question-input-text'))).toBeVisible();
  });

  it('should fill text input', async () => {
    await element(by.id('question-input-text')).replaceText(
      'Coucou toi qui essaie de debugger les tests e2e',
    );
    await element(by.id('question-screen')).multiTap(2);
    await waitForVisible('button-validate');
  });

  describe('Negative correction', () => {
    it('should see the negative correction screen', async () => {
      await element(by.id('button-validate')).multiTap(2);
      await waitForExist('correction-error');
    });
  });

  describe('Positive correction', () => {
    beforeAll(async () => {
      await element(by.id('button-next-question')).tap();
    });
    it('should see the positve correction screen', async () => {
      await element(by.id('question-input-text')).replaceText('Play Store');
      await element(by.id('question-screen')).multiTap(2);
      await element(by.id('button-validate')).multiTap(2);
      await waitForExist('correction-success');
    });
  });
});
