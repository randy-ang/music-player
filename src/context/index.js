import React from 'react';
import {node} from 'prop-types';

import MusicPlayerProvider from './musicPlayer';
import SnackbarProvider from './snackbar';

function ContextProvider({children}) {
  return (
    <SnackbarProvider>
      <MusicPlayerProvider>{children}</MusicPlayerProvider>
    </SnackbarProvider>
  );
}

ContextProvider.propTypes = {
  children: node.isRequired,
};

export default ContextProvider;
