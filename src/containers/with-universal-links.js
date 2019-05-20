// @flow

import _url from 'url';

import * as React from 'react';
import {Linking} from 'react-native';
import {connect} from 'react-redux';
import {withNavigation} from 'react-navigation';
import hoistNonReactStatic from 'hoist-non-react-statics';

import {AUTHENTICATION_TYPE} from '../const';
import {signIn, signOut} from '../redux/actions/authentication';
import type {State as TokenState} from '../redux/reducers/authentication/token';
import type {URLEventType} from '../types';

type ConnectedStateProps = {|
  token: TokenState
|};

type ConnectedDispatchProps = {|
  signIn: typeof signIn,
  signOut: typeof signOut
|};

const UNIVERSAL_LINKS_PATTERN = /(.*)\/open-app/;

function withUniversalLinks<P>(WrappedComponent: React$ComponentType<P>): React$ComponentType<P> {
  type Props = $Exact<{|
    ...P,
    ...ReactNavigation$WithNavigationProps,
    ...ConnectedStateProps,
    ...ConnectedDispatchProps
  |}>;

  class ComponentWithUniversalLinks extends React.PureComponent<Props> {
    props: Props;

    async componentDidMount() {
      Linking.addEventListener('url', this.handleOpenURL);

      const url = await Linking.getInitialURL();

      if (url) {
        await this.handleOpenURL({url});
      }
    }

    componentWillUnmount() {
      Linking.removeEventListener('url', this.handleOpenURL);
    }

    handleOpenURL = async ({url}: URLEventType) => {
      const {pathname, query} = _url.parse(url, true);

      if (!query || !query.jwt || !pathname) {
        return;
      }

      if (pathname.match(UNIVERSAL_LINKS_PATTERN)) {
        const route = pathname.replace(UNIVERSAL_LINKS_PATTERN, '');

        if (query.jwt !== this.props.token) {
          if (this.props.token) {
            await this.props.signOut();
          }
          await this.props.signIn(AUTHENTICATION_TYPE.MAGIC_LINK, query.jwt);
        }

        return this.handleNavigate(route);
      }
    };

    handleNavigate = (route: string) => {
      switch (route) {
        default:
          return this.props.navigation.navigate('Home');
      }
    };

    render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  const mapStateToProps = ({authentication}: StoreState): ConnectedStateProps => ({
    token: authentication.user.token
  });

  const mapDispatchToProps: ConnectedDispatchProps = {
    signIn,
    signOut
  };

  return hoistNonReactStatic(
    connect(
      mapStateToProps,
      mapDispatchToProps
    )(withNavigation(ComponentWithUniversalLinks)),
    WrappedComponent
  );
}

export default withUniversalLinks;
