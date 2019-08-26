// @flow

import React from 'react';
import Modal from 'react-native-modal';
import {Linking} from 'react-native';
import {connect} from 'react-redux';
import {createSelector} from 'reselect';

import ErrorModalComponent from '../components/error-modal';
import type {ErrorType} from '../types';
import {hideModal, refresh} from '../redux/actions/ui/modal';
import {signOut} from '../redux/actions/authentication';
import type {StoreState} from '../redux/store';
import {assistanceEmail} from '../../app';

export type ConnectedStateProps = {|
  isVisible: boolean,
  errorType: ErrorType,
  lastAction?: () => void
|};

type ConnectedDispatchProps = {|
  hideModal: typeof hideModal,
  refresh: typeof refresh,
  signOut: typeof signOut
|};

export type OwnProps = {|
  onClose: () => void
|};

type Props = {|
  ...ConnectedStateProps,
  ...ConnectedDispatchProps,
  ...OwnProps
|};

class ErrorListener extends React.PureComponent<Props> {
  props: Props;

  handleAssistancePress = () => {
    Linking.openURL(`mailto:${assistanceEmail}`);
  };

  handleClose = () => {
    this.props.hideModal();
    this.props.signOut();
    this.props.onClose();
  };

  handleRefresh = () => {
    this.props.refresh();
  };

  render() {
    const {errorType} = this.props;

    return (
      <Modal
        isVisible={this.props.isVisible}
        onSwipeComplete={this.handleClose}
        onBackdropPress={this.handleClose}
        testID="modal"
      >
        <ErrorModalComponent
          onClose={this.handleClose}
          onRefresh={this.handleRefresh}
          onAssistancePress={this.handleAssistancePress}
          type={errorType}
          testID="error-modal"
        />
      </Modal>
    );
  }
}

const getError = (state: StoreState) => state.error;
const getErrorState = createSelector(
  [getError],
  error => error
);

export const mapStateToProps = (state: StoreState): ConnectedStateProps => getErrorState(state);

const mapDispatchToProps: ConnectedDispatchProps = {
  hideModal,
  refresh,
  signOut
};

export {ErrorListener as Component};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ErrorListener);
