import {StyleSheet} from 'react-native';

export const SnackbarStyles = StyleSheet.create({
  container: {},
  controls: {
    marginTop: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  error: {
    backgroundColor: 'red',
  },
  hidden: {
    display: 'none',
  },
  songInfo: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
