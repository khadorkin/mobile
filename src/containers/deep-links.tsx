import _url from 'url';
import * as React from 'react';
import {Linking} from 'react-native';
import {connect} from 'react-redux';
import {createSelector} from 'reselect';
import {StackScreenProps} from '@react-navigation/stack';
import {getToken} from '../redux/utils/state-extract';
import {AUTHENTICATION_TYPE} from '../const';
import {signIn, signOut} from '../redux/actions/authentication';
import type {State as TokenState} from '../redux/reducers/authentication/token';
import {fetchCard, getCardFromLocalStorage} from '../layer/data/cards';
import {selectCard} from '../redux/actions/catalog/cards/select';

interface ConnectedStateProps {
  token: TokenState;
}

interface ConnectedDispatchProps {
  signIn: typeof signIn;
  signOut: typeof signOut;
  selectCard: typeof selectCard;
}

interface Props
  extends StackScreenProps<{Home: undefined; Slide: undefined}, 'Home'>,
    ConnectedStateProps,
    ConnectedDispatchProps {
  children: JSX.Element;
}

let appHasBeenLaunched = false;

const VALIDE_PATHS = /(dashboard|discipline|microlearning)/;
const DeepLinks = ({
  token,
  navigation,
  signIn: _signIn,
  signOut: _signOut,
  selectCard: _selectCard,
  children,
}: Props) => {
  const handleNavigation = React.useCallback(
    (route: 'Slide' | 'Home') => {
      switch (route) {
        case 'Slide':
          return navigation.navigate('Slide');
        default:
          return navigation.navigate('Home');
      }
    },
    [navigation],
  );

  const getContentCard = React.useCallback(
    async (ref: string) => {
      const localCard = await getCardFromLocalStorage(ref);
      if (localCard) {
        _selectCard(localCard);
      } else {
        const remoteCard = await fetchCard({
          ref,
          type: ref.startsWith('cha_') ? 'chapter' : 'discipline',
        });
        if (remoteCard) {
          _selectCard(remoteCard);
        }
      }
    },
    [_selectCard],
  );

  const handleDeepLinking = React.useCallback(
    async (evt) => {
      const {pathname, query} = _url.parse(evt.url, true);
      if (!query || !query.jwt || !pathname) {
        return;
      }

      if (pathname.match(VALIDE_PATHS)) {
        const route = pathname.replace(VALIDE_PATHS, '');

        if (query.jwt !== token) {
          if (token) {
            await _signOut();
          }
          await _signIn(AUTHENTICATION_TYPE.MAGIC_LINK, query.jwt);
        }
        if (route.startsWith('//')) {
          const contentRef = route.replace('//', '');
          await getContentCard(contentRef);
          handleNavigation('Home');
          setTimeout(() => {
            return handleNavigation('Slide');
          }, 0);
        }
        return handleNavigation('Home');
      }
    },
    [_signIn, _signOut, getContentCard, handleNavigation, token],
  );

  const handleInitialLink = React.useCallback(async () => {
    const url = await Linking.getInitialURL();
    if (url && !appHasBeenLaunched) {
      appHasBeenLaunched = true;
      handleDeepLinking({url});
    }
  }, [handleDeepLinking]);

  React.useEffect(() => {
    handleInitialLink();
    Linking.addEventListener('url', handleDeepLinking);
    return () => Linking.removeEventListener('url', handleDeepLinking);
  }, [handleDeepLinking, handleInitialLink]);

  return children;
};

const getTokenState = createSelector([getToken], (token) => token);

export const mapStateToProps = (state: StoreState): ConnectedStateProps => ({
  token: getTokenState(state),
});

const mapDispatchToProps: ConnectedDispatchProps = {
  signIn,
  signOut,
  selectCard,
};

export {DeepLinks as Component};
export default connect(mapStateToProps, mapDispatchToProps)(DeepLinks);
