// @flow

import * as React from 'react';
import {connect} from 'react-redux';

import BrandThemeProviderComponent from '../components/brand-theme-provider';

type ConnectedStateProps = {|
  host?: string
|};

type Props = {|
  ...ConnectedStateProps,
  children: React.Node
|};

const BrandThemeProvider = ({children, host}: Props) => (
  <BrandThemeProviderComponent host={host}>{children}</BrandThemeProviderComponent>
);

const mapStateToProps = ({user}: StoreState): ConnectedStateProps => ({
  host: user.host
});

export default connect(mapStateToProps)(BrandThemeProvider);
