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

interface ConnectedStateProps {
  token: TokenState;
}

interface ConnectedDispatchProps {
  signIn: typeof signIn;
  signOut: typeof signOut;
}

interface Props
  extends StackScreenProps<{Home: undefined}, 'Home'>,
    ConnectedStateProps,
    ConnectedDispatchProps {
  children: JSX.Element;
}

const VALIDE_PATHS = /dashboard/;
const DeepLinks = ({token, navigation, signIn: _signIn, signOut: _signOut, children}: Props) => {
  const handleNavigation = React.useCallback(
    (route: string) => {
      switch (route) {
        default:
          return navigation.navigate('Home');
      }
    },
    [navigation],
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

        return handleNavigation(route);
      }
    },
    [_signIn, _signOut, handleNavigation, token],
  );

  React.useEffect(() => {
    Linking.addEventListener('url', handleDeepLinking);
    return () => Linking.removeEventListener('url', handleDeepLinking);
  }, [handleDeepLinking]);

  return children;
};

const getTokenState = createSelector([getToken], (token) => token);

export const mapStateToProps = (state: StoreState): ConnectedStateProps => ({
  token: getTokenState(state),
});

const mapDispatchToProps: ConnectedDispatchProps = {
  signIn,
  signOut,
};

export {DeepLinks as Component};
export default connect(mapStateToProps, mapDispatchToProps)(DeepLinks);
