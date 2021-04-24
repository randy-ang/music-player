import {StyleSheet} from 'react-native';

export const MusicPlayerStyles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    margin: 32,
  },
  controls: {
    marginTop: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  hidden: {
    display: 'none',
  },
  songInfo: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
