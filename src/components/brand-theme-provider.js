// @flow

import * as React from 'react';
import {connect} from 'react-redux';

type Colors = {|
  primary: string
|};

type BrandTheme = {|
  host?: string,
  colors: Colors
|};

type ConnectedStateProps = {|
  host?: string
|};

type Props = {|
  ...ConnectedStateProps,
  children: React.Node
|};

type State = {|
  colors: Colors
|};

const initialState: State = {
  colors: {
    primary: '#00B0FF'
  }
};

export const BrandThemeContext = React.createContext(initialState);

export class BrandThemeProvider extends React.PureComponent<Props, State> {
  props: Props;

  state: State = initialState;

  render() {
    const {children, ...props} = this.props;
    const value: BrandTheme = {...props, ...this.state};

    return <BrandThemeContext.Provider value={value}>{children}</BrandThemeContext.Provider>;
  }
}

const mapStateToProps = ({user}: StoreState): ConnectedStateProps => ({
  host: user.host
});

export default connect(mapStateToProps)(BrandThemeProvider);
