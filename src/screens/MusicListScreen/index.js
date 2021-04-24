import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ActivityIndicator,
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
  const [loading, setLoading] = useState(true);

  const {playMusic, currentTrackId} = useMusicPlayer();
  const {showSnackbar} = useSnackbar();
  const searchMusic = () => {
    var url = new URL('https://itunes.apple.com/search'),
      params = {country: 'ID', term: searchedValue, media: 'music'};
    Object.keys(params).forEach(key =>
      url.searchParams.append(key, params[key]),
    );
    setLoading(true);
    fetch(url)
      .then(res => res.json())
      .then(({results}) => {
        setMusicLists(results);
      })
      .catch(err => {
        showSnackbar('Failed to get music with error: ' + err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const playChosenMusic = trackNo => {
    playMusic(musicList, trackNo);
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
      <ActivityIndicator
        animating={loading}
        size="large"
        color="#00ff00"
        style={[styles.loader, !loading && styles.hidden]}
      />
      <FlatList
        data={musicList}
        renderItem={musicProps => (
          <MusicItemList
            {...musicProps}
            playMusic={playChosenMusic}
            isPlaying={musicProps.item.trackId === currentTrackId}
          />
        )}
        keyExtractor={({trackId}) => trackId}
      />
    </SafeAreaView>
  );
}
