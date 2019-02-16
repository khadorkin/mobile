import * as React from 'react';
import {storiesOf} from '@storybook/react-native';
import Text from './text';

import CardFooterOverlay from './card-footer-overlay';

storiesOf('Card Overlay', module).add('default', () => (
  <CardFooterOverlay>
    <Text>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis in mauris sem. Aliquam a
      dignissim eros. Suspendisse efficitur egestas eros, vitae auctor augue lacinia eget. Aenean
      ipsum lorem, sollicitudin ac scelerisque vitae, facilisis sit amet mauris. Pellentesque vel
      dui justo. Nunc ac scelerisque dolor. Nullam condimentum hendrerit quam.
    </Text>
  </CardFooterOverlay>
));
