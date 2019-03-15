// @flow

import * as React from 'react';
import {Animated, View, Text, StyleSheet} from 'react-native';
import {
  NovaSolidVoteRewardsVoteHeart as HeartIcon,
  NovaCompositionCoorpacademyBrokenHeart as HeartBrokenIcon,
  NovaCompositionCoorpacademyVoteHeartOutline as HeartOutlineIcon
} from '@coorpacademy/nova-icons';

import theme from '../modules/theme';

export type Props = {|
  count: number,
  height: number,
  winningLife: boolean,
  isBroken?: boolean,
  testID?: string,
  translateX?: Animated.Interpolation,
  textTranslateY?: Animated.Interpolation,
  tmpTextTranslateY?: Animated.Interpolation,
  scaleX?: Animated.Interpolation,
  scaleY?: Animated.Interpolation,
  heartOpacity?: Animated.Interpolation,
  heartBrokenOpacity?: Animated.Interpolation
|};

const HEART_OFFSET_RIGHT = 0.4;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center'
  },
  heart: {
    position: 'absolute'
  },
  lives: {
    flex: 1,
    backgroundColor: theme.colors.white,
    borderRadius: theme.radius.thumbnail,
    alignItems: 'center',
    justifyContent: 'center'
  },
  heartIcon: {
    position: 'absolute',
    top: 0,
    left: 0
  },
  text: {
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.gray.dark
  },
  texts: {
    position: 'relative'
  }
});

const Lives = ({
  count,
  winningLife,
  height,
  isBroken,
  testID = 'lives',
  translateX,
  textTranslateY,
  tmpTextTranslateY,
  scaleX,
  scaleY,
  heartOpacity,
  heartBrokenOpacity
}: Props) => {
  const heartHeight = height * 0.6;
  const heartIconStyle = {height: heartHeight, width: heartHeight};
  const containerStyle = {
    paddingLeft: heartHeight * (1 - HEART_OFFSET_RIGHT),
    width: height + heartHeight * (1 - HEART_OFFSET_RIGHT),
    height
  };
  const transform = [];
  const textTransform = [];
  const tmpTextTransform = [];
  if (translateX) {
    transform.push({translateX});
  }
  if (scaleX) {
    transform.push({scaleX});
  }
  if (scaleY) {
    transform.push({scaleY});
  }
  if (textTranslateY) {
    textTransform.push({translateY: textTranslateY});
  }
  if (tmpTextTranslateY) {
    tmpTextTransform.push({translateY: textTranslateY});
  }

  const heartStyle = {
    height: heartHeight,
    width: heartHeight,
    transform
  };
  const livesStyle = {
    width: height,
    height,
    overflow: 'hidden'
  };
  const textStyle = {
    fontSize: height / 3
  };
  const animatedTextStyle = {
    left: -height / 6,
    top: -height / 6,
    position: 'absolute',
    backgroundColor: '#ff00ff',
    transform: textTransform
  };
  const animatedTmpTextTransform = {
    left: -height / 6,
    position: 'absolute',
    backgroundColor: '#0faa0f',
    transform: textTransform
  };

  const brokenSuffix = isBroken ? '-broken' : '';
  const tmpCount = winningLife ? count - 1 : count + 1;

  return (
    <View style={[styles.container, containerStyle]} testID={testID}>
      <View style={[styles.lives, livesStyle]} testID={`${testID}-${count}${brokenSuffix}`}>
        {winningLife === true && (
          <View style={styles.texts}>
            <Animated.View style={animatedTmpTextTransform}>
              <Text style={[styles.text, textStyle]}>x{tmpCount}</Text>
            </Animated.View>
            <Animated.View style={animatedTextStyle}>
              <Text style={[styles.text, textStyle]}>x{count}</Text>
            </Animated.View>
          </View>
        )}
        {winningLife === false && (
          <View style={styles.texts}>
            <Animated.View style={animatedTextStyle}>
              <Text style={[styles.text, textStyle]}>x{count}</Text>
            </Animated.View>
            <Animated.View style={animatedTmpTextTransform}>
              <Text style={[styles.text, textStyle]}>x{tmpCount}</Text>
            </Animated.View>
          </View>
        )}
      </View>
      <Animated.View style={[styles.heart, heartStyle]}>
        <HeartOutlineIcon
          color={theme.colors.white}
          stroke={theme.colors.white}
          style={{height: heartHeight, width: heartHeight}}
        />
        <Animated.View
          style={[
            styles.heartIcon,
            {
              opacity: heartOpacity || 1
            }
          ]}
        >
          <HeartIcon color={theme.colors.negative} style={heartIconStyle} />
        </Animated.View>
        <Animated.View
          style={[
            styles.heartIcon,
            {
              opacity: heartBrokenOpacity || 0
            }
          ]}
        >
          <HeartBrokenIcon color={theme.colors.negative} style={heartIconStyle} />
        </Animated.View>
      </Animated.View>
    </View>
  );
};

export default Lives;
