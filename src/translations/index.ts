/* eslint-disable import/max-dependencies */

import LocalizedStrings from 'react-native-localization';
import {Translations, SupportedLanguage} from './_types';

export const locales = {
  // keep this locale in first position to be the default language if none matches
  en: require('./en.json') as Translations,
  cs: require('./cs.json') as Translations,
  de: require('./de.json') as Translations,
  // @todo uncomment this once mooc API supports en-US
  // 'en-US': en_US,
  es: require('./es.json') as Translations,
  fr: require('./fr.json') as Translations,
  hu: require('./hu.json') as Translations,
  it: require('./it.json') as Translations,
  ja: require('./ja.json') as Translations,
  ko: require('./ko.json') as Translations,
  nl: require('./nl.json') as Translations,
  pl: require('./pl.json') as Translations,
  pt: require('./pt.json') as Translations,
  ro: require('./ro.json') as Translations,
  ru: require('./ru.json') as Translations,
  tr: require('./tr.json') as Translations,
  uk: require('./uk.json') as Translations,
  vi: require('./vi.json') as Translations,
  'zh-TW': require('./zh-tw.json') as Translations,
  zh: require('./zh.json') as Translations,
};

export const SUPPORTED_LANGUAGES = Object.keys(locales);
export const DEFAULT_LANGUAGE = SUPPORTED_LANGUAGES[0];

type CustomLocalizedStrings = Translations & {
  formatString: (...args: Array<string>) => string;
  getLanguage: () => SupportedLanguage;
  setLanguage: (language: SupportedLanguage | string) => void;
  getInterfaceLanguage: () => string | SupportedLanguage;
};

const translations: CustomLocalizedStrings = new LocalizedStrings(locales);

export default translations;
