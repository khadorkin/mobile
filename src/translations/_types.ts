export type SupportedLanguage =
  | 'cs'
  | 'de'
  | 'en'
  | 'es'
  | 'fr'
  | 'hu'
  | 'it'
  | 'ja'
  | 'ko'
  | 'nl'
  | 'pl'
  | 'pt'
  | 'ro'
  | 'ru'
  | 'tr'
  | 'uk'
  | 'vi'
  | 'zh-TW'
  | 'zh';

type NotificationWording = {
  title: string;
  description: string;
};

export type Translations = {
  accessTheLesson: string;
  article: string;
  authenticationMagicLinkHeader: string;
  authenticationMagicLinkStepOneDescription: string;
  authenticationMagicLinkStepTwoDescription: string;
  authenticationMagicLinkStepThreeDescription: string;
  authenticationMagicLinkTitle: string;
  authenticationQRCodeHeader: string;
  authenticationQRCodeStepOneDescription: string;
  authenticationQRCodeStepTwoDescription: string;
  authenticationQRCodeStepThreeDescription: string;
  authenticationQRCodeTitle: string;
  authorizeNotifications: string;
  askForHelp: string;
  backToHome: string;
  bonus: string;
  cancel: string;
  clue: string;
  clueStarsToLoose: string;
  congratulations: string;
  connectionLost: string;
  connectionRestored: string;
  context: string;
  correction: string;
  dataLost: string;
  didYouKnowThat: string;
  finishCourse: string;
  finishCourseWordings: NotificationWording[];
  finishLearning: string;
  forYou: string;
  gameOver: string;
  getAnExtralife: string;
  goodAnswer: string;
  goodJob: string;
  goToQuestion: string;
  highscore: string;
  howToSignIn: string;
  iWantIt: string;
  keyPoint: string;
  lesson: string;
  logOut: string;
  needHelp: string;
  new: string;
  next: string;
  nextLevel: string;
  nextChapter: string;
  noResults: string;
  noResultsDescription: string;
  ok: string;
  ooops: string;
  open: string;
  openBrowser: string;
  openSettings: string;
  ouch: string;
  outOfLives: string;
  permission: string;
  permissionCamera: string;
  notificationSamples: NotificationWording[];
  permissionNotificationHeadline: string;
  permissionNotificationDescription: string;
  permissionNotificationAuthorize: string;
  currentlyDoingReminder: string;
  yesNotifyMe: string;
  maybeLater: string;
  platformHasBeenDisabled: string;
  podcast: string;
  question: string;
  quit: string;
  reactivatePlatform: string;
  refresh: string;
  refreshEnjoyLearning: string;
  refreshNotWorking: string;
  resumeLearning: string;
  retryLevel: string;
  retryChapter: string;
  relatedSubjects: string;
  scanQRCode: string;
  scorm: string;
  externalFinishCourse: string;
  search: string;
  seeClue: string;
  selectAnAnswer: string;
  selectSomethingBelow: string;
  settings: string;
  signInDesktop: string;
  signInMobile: string;
  startDemo: string;
  startLearning: string;
  step: string;
  suggestion: string;
  suggestionWordings: NotificationWording[];
  typeHere: string;
  unlockNextLevel: string;
  upgrade: string;
  upgradeDescription: string;
  validate: string;
  version: string;
  video: string;
  videoLoadingError: string;
  welcome: string;
  welcomeDescription: string;
  welcomeUser: string;
  winAdditionalStars: string;
  wrongAnswer: string;
  yourAnswer: string;
  yourAnswers: string;
};
