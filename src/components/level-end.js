// @flow strict
/* eslint import/max-dependencies: 0 */

import * as React from 'react';
import {View, StyleSheet, Dimensions, ScrollView} from 'react-native';
import ConfettiCannon from '@coorpacademy/react-native-confetti-cannon';
import type {ContentType} from '@coorpacademy/progression-engine';

import translations from '../translations';
import {CONTENT_TYPE} from '../const';
import theme from '../modules/theme';
import {getStatusBarHeight} from '../modules/status-bar';
import type {ChapterCard, DisciplineCard} from '../layer/data/_types';
import withVibration from '../containers/with-vibration';
import type {WithVibrationProps} from '../containers/with-vibration';
import withAudio from '../containers/with-audio';
import type {WithAudioProps} from '../containers/with-audio';
import ButtonSticky from './button-sticky';
import {STYLE as BOX_STYLE} from './box';
import Card, {LAYOUT as CARD_LAYOUT} from './card';
import CatalogItem from './catalog-item';
import Starburst from './starburst';
import HeartBroken from './heart-broken';
import Trophy from './trophy';
import {HEIGHT as BUTTON_HEIGHT} from './button';
import Text from './text';
import Space from './space';
import {BrandThemeContext} from './brand-theme-provider';
import Tooltip from './tooltip';
import HeaderBackButton from './header-back-button';

const PADDING_WIDTH = theme.spacing.base;
export const POSITIVE_COLOR = theme.colors.positive;
export const NEGATIVE_COLOR = theme.colors.negative;

const styles = StyleSheet.create({
  globalContainer: {
    flex: 1
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
    paddingBottom: BUTTON_HEIGHT + theme.spacing.base * 2
  },
  content: {
    paddingHorizontal: PADDING_WIDTH,
    paddingBottom: PADDING_WIDTH
  },
  starburst: {
    position: 'absolute'
  },
  starburstSpiral: {
    top: '-10%'
  },
  positive: {
    backgroundColor: theme.colors.positive
  },
  negative: {
    backgroundColor: theme.colors.negative
  },
  mainHeader: {
    color: theme.colors.white,
    textAlign: 'center',
    fontSize: theme.fontSize.xxlarge,
    fontWeight: theme.fontWeight.bold
  },
  subHeader: {
    fontSize: theme.fontSize.large,
    color: theme.colors.white
  },
  header: {
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    paddingHorizontal: PADDING_WIDTH,
    // @todo quick fix, we have to rework the component
    paddingTop: getStatusBarHeight() + 18
  },
  card: {
    borderRadius: theme.radius.card,
    minHeight: 1,
    overflow: 'hidden'
  },
  text: {
    fontSize: theme.fontSize.large,
    color: theme.colors.white,
    fontWeight: theme.fontWeight.bold
  },
  title: {
    fontSize: theme.fontSize.large,
    color: theme.colors.white,
    fontWeight: theme.fontWeight.bold,
    paddingBottom: theme.spacing.small,
    paddingTop: theme.spacing.base
  },
  recommendation: {
    flex: 1,
    borderRadius: theme.radius.card
  },
  iconContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    alignItems: 'center',
    paddingVertical: PADDING_WIDTH
  },
  iconWrapper: {
    ...BOX_STYLE,
    backgroundColor: theme.colors.white,
    borderRadius: theme.radius.button,
    justifyContent: 'center',
    alignItems: 'center',
    height: theme.spacing.large,
    width: theme.spacing.large
  },
  icons: {
    width: theme.spacing.base,
    height: theme.spacing.base,
    color: theme.colors.positive
  },
  icon: {
    marginTop: -theme.spacing.base,
    marginBottom: -theme.spacing.xlarge
  },
  separator: {
    ...BOX_STYLE,
    width: theme.spacing.micro - 2,
    borderColor: theme.colors.white,
    backgroundColor: theme.colors.white,
    marginHorizontal: theme.spacing.medium,
    height: '100%',
    borderWidth: 1
  },
  confettisContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%'
  }
});

const {width: screenWidth} = Dimensions.get('window');

type Props = {|
  ...WithVibrationProps,
  ...WithAudioProps,
  contentType: ContentType,
  isSuccess: boolean,
  onButtonPress: () => void,
  onCardPress: (item: DisciplineCard | ChapterCard) => void,
  onClose: () => void,
  isFocused: boolean,
  bestScore: string,
  nextContentType?: typeof CONTENT_TYPE.LEVEL | typeof CONTENT_TYPE.CHAPTER,
  nextContentLabel?: string,
  recommendation: DisciplineCard | ChapterCard,
  testID?: string
|};

class LevelEnd extends React.PureComponent<Props> {
  props: Props;

  componentDidMount() {
    const {isSuccess, vibration, audio} = this.props;

    if (!isSuccess) {
      vibration.vibrate(vibration.VIBRATION_TYPE.NOTIFICATION_ERROR);
      audio.play(audio.AUDIO_FILE.FAILURE_LEVEL);
    } else {
      vibration.vibrate(vibration.VIBRATION_TYPE.NOTIFICATION_SUCCESS);
      audio.play(audio.AUDIO_FILE.SUCCESS_LEVEL);
    }
  }

  handleButtonPress = () => this.props.onButtonPress();

  render() {
    const {
      contentType,
      isSuccess,
      bestScore,
      onClose,
      nextContentType,
      nextContentLabel = '',
      recommendation,
      isFocused,
      testID = 'level-end',
      onCardPress
    } = this.props;

    const header = (isSuccess && translations.congratulations) || translations.ooops;
    const backgroundColor = (isSuccess && styles.positive) || styles.negative;
    const unlockNextLevelTranslation = translations.unlockNextLevel.replace(
      /{{levelName}}/g,
      nextContentLabel
    );

    const nextLabel =
      contentType === CONTENT_TYPE.LEVEL ? translations.nextLevel : translations.nextChapter;
    const retryLabel =
      contentType === CONTENT_TYPE.LEVEL ? translations.retryLevel : translations.retryChapter;

    const buttonTranslation =
      (isSuccess && !nextContentType && translations.backToHome) ||
      (isSuccess && nextLabel) ||
      retryLabel;

    const buttonAnalyticsID =
      (isSuccess && !nextContentType && `button-end-${contentType}-back-to-home`) ||
      (isSuccess && `button-end-next-${contentType}`) ||
      `button-end-retry-${contentType}`;

    return (
      <BrandThemeContext.Consumer>
        {brandTheme => (
          <View style={styles.globalContainer} testID={testID}>
            <ScrollView>
              <View
                style={[styles.container, backgroundColor]}
                testID={`${testID}-${isSuccess ? 'success' : 'error'}`}
              >
                <Starburst
                  style={styles.starburst}
                  spiralStyle={styles.starburstSpiral}
                  spiralColor="rgba(0,0,0,0.06)"
                  backgroundColor={isSuccess ? theme.colors.positive : theme.colors.negative}
                />
                <View style={styles.header}>
                  <Text style={styles.mainHeader} testID={`${testID}-header`}>
                    {header}
                  </Text>
                  {!isSuccess && (
                    <Text style={styles.subHeader} testID={`${testID}-subtitle`}>
                      {translations.outOfLives}
                    </Text>
                  )}
                </View>
                <HeaderBackButton onPress={onClose} type="home" testID={`${testID}-button-close`} />
                {isSuccess ? (
                  <Trophy style={[styles.icon, {height: screenWidth}]} />
                ) : (
                  <HeartBroken style={[styles.icon, {height: screenWidth}]} />
                )}
                <Space type="base" />
                <View style={styles.content}>
                  {isSuccess && (
                    <View>
                      {parseInt(bestScore) > 0 && (
                        <Tooltip
                          type="highscore"
                          text={translations.highscore.replace(/{{score}}/g, `+${bestScore}`)}
                        />
                      )}
                      <Space type="tiny" />
                      {nextContentType === CONTENT_TYPE.LEVEL && (
                        <Tooltip type="unlock" text={unlockNextLevelTranslation} />
                      )}
                    </View>
                  )}
                  {/* @todo refactor to use CatalogSection there and not reinvent the wheel */}
                  {recommendation && (
                    <View style={styles.recommendation}>
                      <Text style={styles.title}>{translations.relatedSubjects}</Text>
                      <Card type={CARD_LAYOUT.CONTAIN} style={styles.card}>
                        <CatalogItem
                          item={recommendation}
                          onPress={onCardPress}
                          size="cover"
                          testID={`recommend-item-${recommendation.universalRef.replace(
                            /_/g,
                            '-'
                          )}`}
                          section="recommendation"
                        />
                      </Card>
                    </View>
                  )}
                </View>
              </View>
            </ScrollView>
            {isFocused && isSuccess && bestScore !== '0' && (
              <View pointerEvents="none" style={styles.confettisContainer}>
                <ConfettiCannon
                  count={100}
                  origin={{x: screenWidth / 2, y: 0}}
                  fadeOut
                  explosionSpeed={900}
                />
              </View>
            )}
            <ButtonSticky
              onPress={this.handleButtonPress}
              testID={`button-${isSuccess ? 'next' : 'retry'}-level`}
              analyticsID={buttonAnalyticsID}
            >
              {buttonTranslation}
            </ButtonSticky>
          </View>
        )}
      </BrandThemeContext.Consumer>
    );
  }
}

export {LevelEnd as Component};
export default withVibration(withAudio(LevelEnd));
