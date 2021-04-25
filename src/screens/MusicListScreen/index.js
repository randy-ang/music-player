import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  PermissionsAndroid,
  TextInput,
  FlatList,
} from 'react-native';

import {Appbar} from 'react-native-paper';
import MusicItemList from './MusicItemList';
import {useMusicPlayer} from '../../context/musicPlayer';
import {useSnackbar} from '../../context/snackbar';

const styles = StyleSheet.create({
  textfield: {
    color: 'white',
  },
  loader: {
    position: 'absolute',
  },
  hidden: {
    display: 'none',
  },
  barStyle: {
    paddingHorizontal: 16,
  },
});

export default function MusicListScreen() {
  const [musicList, setMusicLists] = useState([]);
  const [searchedValue, setSearchedValue] = useState('');
  const [hasMicrophonePermission, setMicrophonePermission] = useState(false);
  const {showSnackbar} = useSnackbar();

  useEffect(() => {
    // TODO: move to context
    PermissionsAndroid.requestMultiple(
      [
        'android.permission.MODIFY_AUDIO_SETTINGS',
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
      ],
      {
        title: 'Audio Visualizer',
        message:
          'Music Player app needs access to your microphone for audio visualizer',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    ).then(grantedResults => {
      // if any permission is not granted, then considered not granted
      const isGranted = !Object.values(grantedResults).filter(
        grantedResult => grantedResult !== PermissionsAndroid.RESULTS.GRANTED,
      ).length;
      if (!isGranted) {
        showSnackbar('Visualizer will not be displayed');
      }
      setMicrophonePermission(isGranted);
    });
  }, [showSnackbar]);

  const {setPlaylistAndPlay, currentTrackId, isPlaying} = useMusicPlayer();

  const searchMusic = () => {
    var url = new URL('https://itunes.apple.com/search'),
      params = {country: 'ID', term: searchedValue, media: 'music'};
    Object.keys(params).forEach(key =>
      url.searchParams.append(key, params[key]),
    );
    fetch(url)
      .then(res => res.json())
      .then(({results}) => {
        setMusicLists(results);
      })
      .catch(err => {
        showSnackbar('Failed to get music with error: ' + err.message);
      });
  };

  const playChosenMusic = trackNo => {
    setPlaylistAndPlay(musicList, trackNo, {
      parentPlay: !hasMicrophonePermission,
    });
  };

  return (
    <SafeAreaView>
      <Appbar style={styles.barStyle}>
        <TextInput
          testID="searchBar"
          placeholder="Search..."
          placeholderTextColor="white"
          style={styles.textfield}
          onChangeText={setSearchedValue}
          value={searchedValue}
          onBlur={searchMusic}
        />
      </Appbar>
      <FlatList
        data={musicList}
        renderItem={musicProps => (
          <MusicItemList
            {...musicProps}
            playMusic={playChosenMusic}
            playingState={isPlaying}
            isPlaying={musicProps.item.trackId === currentTrackId}
            hasPermission={hasMicrophonePermission}
          />
        )}
        keyExtractor={({trackId}) => trackId}
      />
    </SafeAreaView>
  );
}
