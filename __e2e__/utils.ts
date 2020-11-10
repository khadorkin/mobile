import {by, expect, element, waitFor, device} from 'detox';
import {HEIGHT as HERO_HEIGHT} from '../src/components/hero';
import {ITEM_WIDTH, ITEM_HEIGHT} from '../src/components/catalog-items';

let alreadyLaunched = false;

const defaultPermissions: Detox.DevicePermissions = {
  camera: 'YES',
  microphone: 'YES',
  notifications: 'YES',
};

export const reloadApp = async (
  additionalPermissions: Detox.DevicePermissions = defaultPermissions || {},
  newInstance = false,
  relaunch = false,
) => {
  const permissions: Detox.DevicePermissions = {
    ...defaultPermissions,
    ...additionalPermissions,
  };

  if (relaunch) {
    await device.reloadReactNative();
  } else {
    // @todo use reloadReactNative(); once it's working in Android
    await device.launchApp({
      newInstance: !alreadyLaunched || newInstance,
      permissions,
    });
  }

  if (!alreadyLaunched) {
    alreadyLaunched = true;
  }
};

export const waitForExist = async (testID: string, useText = false) => {
  const getter = useText ? by.text : by.id;
  const el = element(getter(testID));

  await waitFor(el).toExist().withTimeout(1000);
  await expect(el).toExist();
};

export const waitForVisible = async (testID: string) => {
  const el = element(by.id(testID));
  await waitFor(el).toBeVisible().withTimeout(1000);
  await expect(el).toBeVisible();
};

export const waitForNotVisible = async (testID: string) => {
  const el = element(by.id(testID));
  await waitFor(el).toBeNotVisible().withTimeout(4000);
  await expect(el).toBeNotVisible();
};

export const tap = async (testID: string) => {
  await waitForExist(testID);
  await element(by.id(testID)).tap();
};

const getCardOffset = (index: number): {x: number; y: number} => {
  return {
    x: ITEM_WIDTH * (index - 1) + 1, // Scroll amount must be positive and greater than zero
    y: 0,
  };
};

export const tapCardOnList = async (
  parentTestID: string,
  itemTestID: string,
  sectionIndex = 1,
  cardIndex: number,
  scroll = false,
) => {
  if (scroll) {
    await waitForExist('catalog');
    await element(by.id('catalog')).scroll(ITEM_HEIGHT * sectionIndex - ITEM_WIDTH / 2, 'down');
  }
  const {x} = getCardOffset(cardIndex);

  await waitForExist(parentTestID);
  await element(by.id(parentTestID)).scrollTo('left');
  await element(by.id(parentTestID)).scroll(x, 'right');
  await element(by.id(`${parentTestID}-item-${itemTestID}`)).tap();
};

export const longPress = async (testID: string) => {
  await waitForVisible(testID);
  await element(by.id(testID)).longPress();
};

export const bypassAuthentication = async () => {
  await tap('button-sign-in-desktop');
  await tap('authentication-details-qr-code-button');
  await waitForExist('qr-code-scanner');
  await longPress('qr-code-screen');
  await waitForExist('home');
};

export const bypassNotifyMeScreen = async () => {
  await waitForExist('notify-me-screen');
  await tap('notifyme-button');
  await waitForExist('home');
};

export const wrongAnswer = async () => {
  await element(by.id('question-screen')).swipe('up');
  await element(by.id('question-choice-1')).tap();
  await element(by.id('button-validate')).tap();
};

export const scrollHero = async () => {
  await element(by.id('catalog')).scroll(HERO_HEIGHT, 'down');
};

export default {
  reloadApp,
  bypassAuthentication,
};
