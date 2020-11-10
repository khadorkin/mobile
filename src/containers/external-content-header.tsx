import * as React from 'react';
import {View, StyleSheet} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {useSelector} from 'react-redux';
import {
  NovaCompositionCoorpacademyScorm as ScormIcon,
  NovaCompositionCoorpacademyArticle as ArticleIcon,
  NovaCompositionCoorpacademyVideo as VideoIcon,
  NovaCompositionCoorpacademyMicrophone as PodcastIcon,
} from '@coorpacademy/nova-icons';
import {getExternalContentColor} from '../utils';
import {StoreState} from '../redux/store';
import PlaceholderCircle from '../components/placeholder-circle';

import navigationOptions from '../navigator/navigation-options';
import {getHeaderHeight} from '../modules/status-bar';
import Touchable from '../components/touchable';
import theme, {getHitSlop} from '../modules/theme';
import HeaderBackButton, {SPACING as ICON_SPACING} from '../components/header-back-button';
import {State as ExternalContentState} from '../redux/external-content';
import {useBackHandler} from './with-backhandler';

const SIDE_WIDTH = 20 + ICON_SPACING;

const styles = StyleSheet.create({
  container: {
    height: getHeaderHeight(),
  },
  header: {
    ...navigationOptions.headerStyle,
    backgroundColor: theme.colors.white,
    shadowColor: theme.colors.black,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.3,
    shadowRadius: 1,
    elevation: 9,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: getHeaderHeight(),
    paddingTop: getHeaderHeight(0),
  },
  side: {
    width: SIDE_WIDTH,
    justifyContent: 'center',
  },
  center: {
    flex: 1,
    padding: theme.spacing.small,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: theme.fontSize.large,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.gray.dark,
  },
  iconExternalContainer: {
    width: 50,
    height: 50,
    borderRadius: theme.spacing.medium,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const EXTERNAL_CONTENT_ICONS = {
  scorm: ScormIcon,
  article: ArticleIcon,
  video: VideoIcon,
  podcast: PodcastIcon,
};

type Props = StackScreenProps<{ExternalContent: undefined}, 'ExternalContent'>;

const ExternalContentHeader = (props: Props): React.ReactNode => {
  const state: ExternalContentState = useSelector((state: StoreState) => state.externalContent);
  function handleGoBack() {
    props.navigation.goBack();
    return true;
  }

  useBackHandler(handleGoBack);

  const Container: React.FC = ({children}) => (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.side}>
          <Touchable
            hitSlop={getHitSlop()}
            onPress={handleGoBack}
            testID="external-content-header-close"
            analyticsID="external-content-header-close"
          >
            <HeaderBackButton
              isFloating={false}
              color={theme.colors.gray.dark}
              testID="external-content-close-icon"
              onPress={handleGoBack}
              type="close"
            />
          </Touchable>
        </View>
        <View style={styles.center}>{children}</View>
        <View style={styles.side} />
      </View>
    </View>
  );

  if (state.contentType === 'idle') {
    return (
      <Container>
        <View style={[styles.iconExternalContainer]}>
          <PlaceholderCircle width={50} color={theme.colors.gray.light} />
        </View>
      </Container>
    );
  }

  const Icon = EXTERNAL_CONTENT_ICONS[state.contentType];
  const iconColor = getExternalContentColor(state.contentType);
  const backgroundColor = {backgroundColor: iconColor};

  return (
    <Container>
      <View style={[styles.iconExternalContainer, backgroundColor]}>
        <Icon
          testID="external-content-header-icon"
          color={theme.colors.white}
          height={23}
          width={23}
        />
      </View>
    </Container>
  );
};

export default ExternalContentHeader;
