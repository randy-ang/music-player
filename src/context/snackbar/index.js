import React, {createContext, useCallback, useContext, useState} from 'react';
import {Snackbar} from 'react-native-paper';
import noop from '../../utils/noop';
import {SnackbarStyles} from './styles';

export const SnackbarContext = createContext({
  showSnackbar: noop,
});

const defaultOptions = {
  message: '',
  type: 'error',
  duration: 5000,
  visible: false,
};

export const useSnackbar = () => useContext(SnackbarContext);

export default function SnackbarProvider({children}) {
  const [
    {type, message, alert, ...snackbarOptions},
    setSnackbarOptions,
  ] = useState(defaultOptions);

  const handleClose = useCallback(() => {
    setSnackbarOptions({
      ...defaultOptions,
      visible: false,
    });
  }, []);

  const showSnackbar = useCallback((snackbarMessage, options) => {
    setSnackbarOptions({
      ...defaultOptions,
      ...options,
      message: snackbarMessage,
      visible: true,
    });
  }, []);

  const value = {showSnackbar};

  return (
    <SnackbarContext.Provider value={value}>
      {children}
      <Snackbar
        {...snackbarOptions}
        style={[SnackbarStyles.container, SnackbarStyles[type]]}
        onDismiss={handleClose}>
        {message}
      </Snackbar>
    </SnackbarContext.Provider>
  );
}
