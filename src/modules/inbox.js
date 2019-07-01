// @flow

import {openInbox as _openInbox} from 'react-native-email-link';

export const openInbox = () => _openInbox(undefined, undefined, undefined, true);
