import {by, element} from 'detox';
import {
  tapCardOnList,
  waitForExist,
  waitForVisible,
  reloadApp,
  bypassAuthentication,
  bypassNotifyMeScreen,
} from './utils';

const answerQuestion = async () => {
  await waitForExist('question-screen');
  await element(by.id('question-screen')).swipe('up');
  await element(by.id('question-choice-2')).tap();
  await element(by.id('button-validate')).multiTap(2);
  await waitForExist('correction-success');
  await element(by.id('button-next-question')).multiTap(2);
};

describe('Hero: display card for uncomplete level', () => {
  beforeAll(async () => {
    await reloadApp();
    await bypassAuthentication();
    await bypassNotifyMeScreen();
  });

  it('should see the hero on dashboard with recommendation', async () => {
    await waitForVisible('catalog-hero-adaptive-dis-1-footer');
    await waitForVisible('catalog-hero-button');
  });

  it('answer successfully 3 questions', async () => {
    await tapCardOnList('catalog-section-recommended-items', 'basic-dis-1', 1, 2, true);
    await answerQuestion();
    await answerQuestion();
    await answerQuestion();
  });

  it('should back to home', async () => {
    await element(by.id('question-header-back')).tap();
    await waitForVisible('home-screen');
  });

  it('should see the hero on dashboard', async () => {
    await element(by.id('catalog')).scrollTo('top');
    await waitForVisible('catalog-hero-basic-dis-1-footer');
    await waitForVisible('catalog-hero-button');
  });

  it('should be on the context of the course resumed from hero', async () => {
    await element(by.id('catalog-hero-button')).tap();
    await waitForExist('question');
  });
});
