import React from 'react';
import {node} from 'prop-types';

import MusicPlayerProvider from './musicPlayer';

function ContextProvider({children}) {
  return <MusicPlayerProvider>{children}</MusicPlayerProvider>;
}

ContextProvider.propTypes = {
  children: node.isRequired,
};

export default ContextProvider;
