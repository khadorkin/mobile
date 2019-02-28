// @flow strict

import * as React from 'react';

type Colors = {|
  primary: string
|};

type BrandTheme = {|
  host: string,
  colors: Colors
|};

type Props = {|
  host?: string,
  children: React.Node
|};

type State = BrandTheme;

const initialState: State = {
  host: '',
  colors: {
    primary: '#00B0FF'
  }
};

export const BrandThemeContext = React.createContext(initialState);

class BrandThemeProvider extends React.PureComponent<Props, State> {
  props: Props;

  state: State = initialState;

  render() {
    const {children, ...props} = this.props;
    const value: BrandTheme = {...this.state, ...props};

    return <BrandThemeContext.Provider value={value}>{children}</BrandThemeContext.Provider>;
  }
}

export default BrandThemeProvider;
