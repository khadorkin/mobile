// @flow

import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import {
  NovaCompositionCoorpacademyAdaptive,
  NovaSolidStatusCheckCircle2
} from '@coorpacademy/nova-icons';
import type {Progression} from '../types';
import theme from '../modules/theme';
import Text from './text';
import ProgressionBar from './progression-bar';

export type Style = {
  titleSize: number,
  subtitleSize: number,
  progressBarHeight: number
};

type Props = {|
  title: string,
  subtitle: string,
  progression?: Progression,
  isAdaptive: boolean,
  isCertified?: boolean,
  testID: string,
  style?: Style
|};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end'
  },
  title: {
    color: theme.colors.white,
    fontWeight: theme.fontWeight.bold,
    paddingTop: theme.spacing.tiny
  },
  subtitleContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  subtitle: {
    color: theme.colors.white,
    fontWeight: theme.fontWeight.regular,
    paddingBottom: theme.spacing.small,
    paddingTop: theme.spacing.tiny
  },
  certified: {
    paddingLeft: theme.spacing.tiny,
    marginTop: -5
  },
  progressionBar: {
    borderRadius: theme.radius.common,
    overflow: 'hidden'
  }
});

const CatalogItemFooter = ({
  title,
  subtitle,
  progression,
  isAdaptive,
  isCertified,
  testID,
  style = {titleSize: 16, subtitleSize: 14, progressBarHeight: 2}
}: Props) => {
  return (
    <View style={styles.container}>
      {isAdaptive && (
        <NovaCompositionCoorpacademyAdaptive
          testID={`infinite-${testID}`}
          color={theme.colors.white}
          height={style.titleSize}
          width={style.titleSize}
        />
      )}
      <Text testID={`title-${testID}`} style={[styles.title, {fontSize: style.titleSize}]}>
        {title}
      </Text>
      <View style={styles.subtitleContainer}>
        <Text
          testID={`subtitle-${testID}`}
          style={[styles.subtitle, {fontSize: style.subtitleSize}]}
        >
          {subtitle}
        </Text>
        {isCertified && (
          <View style={styles.certified}>
            <NovaSolidStatusCheckCircle2
              testID={`certified-${testID}`}
              color={theme.colors.white}
              height={style.subtitleSize}
              width={style.subtitleSize}
            />
          </View>
        )}
      </View>
      {progression && (
        <View style={styles.progressionBar} testID={`progressBar-${testID}`}>
          <ProgressionBar
            current={progression.current}
            count={progression.count}
            height={style.progressBarHeight}
            bgBarColor={theme.colors.white}
            isInnerRounded
          />
        </View>
      )}
    </View>
  );
};

export default CatalogItemFooter;
