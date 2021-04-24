import {object} from 'prop-types';
import React from 'react';
import {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  ActivityIndicator,
  Button,
  TextInput,
  FlatList,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import {Appbar} from 'react-native-paper';
import {FAVORITES_SCREEN} from '..';
import Icon from 'react-native-vector-icons/FontAwesome';
import MusicItemList from './MusicItemList';
import {useMusicPlayer} from '../../context/musicPlayer';
const myIcon = <Icon name="rocket" size={30} color="#900" />;

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  textfield: {
    color: 'white',
  },
  loader: {
    position: 'absolute',
  },
  loaderContainer: {},
  hidden: {
    display: 'none',
  },
});

// {
//   "resultCount":10,
//   "results": [
//  {"wrapperType":"track", "kind":"song", "artistId":183313439, "collectionId":858512800, "trackId":858517200, "artistName":"Ed Sheeran", "collectionName":"x (Deluxe Edition)", "trackName":"Thinking Out Loud", "collectionCensoredName":"x (Deluxe Edition)", "trackCensoredName":"Thinking Out Loud", "artistViewUrl":"https://music.apple.com/id/artist/ed-sheeran/183313439?uo=4", "collectionViewUrl":"https://music.apple.com/id/album/thinking-out-loud/858512800?i=858517200&uo=4", "trackViewUrl":"https://music.apple.com/id/album/thinking-out-loud/858512800?i=858517200&uo=4", "previewUrl":"https://audio-ssl.itunes.apple.com/itunes-assets/Music6/v4/5d/4e/2e/5d4e2e52-5d0f-9903-b092-d6165402576d/mzaf_993090175455435181.plus.aac.p.m4a", "artworkUrl30":"https://is4-ssl.mzstatic.com/image/thumb/Music114/v4/76/7f/68/767f68de-4ed9-e781-e3c3-3bf85a9a7c1c/source/30x30bb.jpg", "artworkUrl60":"https://is4-ssl.mzstatic.com/image/thumb/Music114/v4/76/7f/68/767f68de-4ed9-e781-e3c3-3bf85a9a7c1c/source/60x60bb.jpg", "artworkUrl100":"https://is4-ssl.mzstatic.com/image/thumb/Music114/v4/76/7f/68/767f68de-4ed9-e781-e3c3-3bf85a9a7c1c/source/100x100bb.jpg", "releaseDate":"2014-06-20T07:00:00Z", "collectionExplicitness":"notExplicit", "trackExplicitness":"notExplicit", "discCount":1, "discNumber":1, "trackCount":16, "trackNumber":11, "trackTimeMillis":281560, "country":"IDN", "currency":"IDR", "primaryGenreName":"Pop", "isStreamable":true},
//  {"wrapperType":"track", "kind":"song", "artistId":183313439, "collectionId":1193701079, "trackId":1193701392, "artistName":"Ed Sheeran", "collectionName":"÷ (Deluxe)", "trackName":"Shape of You", "collectionCensoredName":"÷ (Deluxe)", "trackCensoredName":"Shape of You", "artistViewUrl":"https://music.apple.com/id/artist/ed-sheeran/183313439?uo=4", "collectionViewUrl":"https://music.apple.com/id/album/shape-of-you/1193701079?i=1193701392&uo=4", "trackViewUrl":"https://music.apple.com/id/album/shape-of-you/1193701079?i=1193701392&uo=4",
//  "previewUrl":"https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview111/v4/65/ca/83/65ca8336-2e09-a0bb-a810-2a6b8864e770/mzaf_3545919152242528717.plus.aac.p.m4a", "artworkUrl30":"https://is4-ssl.mzstatic.com/image/thumb/Music124/v4/79/4e/6d/794e6d41-8213-c34c-9eff-3893e0475fe0/source/30x30bb.jpg", "artworkUrl60":"https://is4-ssl.mzstatic.com/image/thumb/Music124/v4/79/4e/6d/794e6d41-8213-c34c-9eff-3893e0475fe0/source/60x60bb.jpg", "artworkUrl100":"https://is4-ssl.mzstatic.com/image/thumb/Music124/v4/79/4e/6d/794e6d41-8213-c34c-9eff-3893e0475fe0/source/100x100bb.jpg", "collectionPrice":85000.00, "trackPrice":7000.00, "releaseDate":"2017-01-06T08:00:00Z", "collectionExplicitness":"notExplicit", "trackExplicitness":"notExplicit", "discCount":1, "discNumber":1, "trackCount":16, "trackNumber":4, "trackTimeMillis":233713, "country":"IDN", "currency":"IDR", "primaryGenreName":"Pop", "isStreamable":true},
//  {"wrapperType":"track", "kind":"song", "artistId":183313439, "collectionId":1193701079, "trackId":1193701400, "artistName":"Ed Sheeran", "collectionName":"÷ (Deluxe)", "trackName":"Perfect", "collectionCensoredName":"÷ (Deluxe)", "trackCensoredName":"Perfect", "artistViewUrl":"https://music.apple.com/id/artist/ed-sheeran/183313439?uo=4", "collectionViewUrl":"https://music.apple.com/id/album/perfect/1193701079?i=1193701400&uo=4", "trackViewUrl":"https://music.apple.com/id/album/perfect/1193701079?i=1193701400&uo=4",
//  "previewUrl":"https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview122/v4/8a/dd/1f/8add1f4d-142c-1317-250d-ff6370962fb8/mzaf_7601694821840779604.plus.aac.p.m4a", "artworkUrl30":"https://is4-ssl.mzstatic.com/image/thumb/Music124/v4/79/4e/6d/794e6d41-8213-c34c-9eff-3893e0475fe0/source/30x30bb.jpg", "artworkUrl60":"https://is4-ssl.mzstatic.com/image/thumb/Music124/v4/79/4e/6d/794e6d41-8213-c34c-9eff-3893e0475fe0/source/60x60bb.jpg", "artworkUrl100":"https://is4-ssl.mzstatic.com/image/thumb/Music124/v4/79/4e/6d/794e6d41-8213-c34c-9eff-3893e0475fe0/source/100x100bb.jpg", "collectionPrice":85000.00, "trackPrice":7000.00, "releaseDate":"2017-03-03T08:00:00Z", "collectionExplicitness":"notExplicit", "trackExplicitness":"notExplicit", "discCount":1, "discNumber":1, "trackCount":16, "trackNumber":5, "trackTimeMillis":263400, "country":"IDN", "currency":"IDR", "primaryGenreName":"Pop", "isStreamable":true},
//  {"wrapperType":"track", "kind":"song", "artistId":183313439, "collectionId":858512800, "trackId":858517168, "artistName":"Ed Sheeran", "collectionName":"x (Deluxe Edition)", "trackName":"Photograph", "collectionCensoredName":"x (Deluxe Edition)", "trackCensoredName":"Photograph", "artistViewUrl":"https://music.apple.com/id/artist/ed-sheeran/183313439?uo=4", "collectionViewUrl":"https://music.apple.com/id/album/photograph/858512800?i=858517168&uo=4", "trackViewUrl":"https://music.apple.com/id/album/photograph/858512800?i=858517168&uo=4", "previewUrl":"https://audio-ssl.itunes.apple.com/itunes-assets/Music4/v4/fe/d5/eb/fed5eb78-c5a2-7b71-7e47-cbcb631cc0ab/mzaf_1882504711906193941.plus.aac.p.m4a", "artworkUrl30":"https://is4-ssl.mzstatic.com/image/thumb/Music114/v4/76/7f/68/767f68de-4ed9-e781-e3c3-3bf85a9a7c1c/source/30x30bb.jpg", "artworkUrl60":"https://is4-ssl.mzstatic.com/image/thumb/Music114/v4/76/7f/68/767f68de-4ed9-e781-e3c3-3bf85a9a7c1c/source/60x60bb.jpg", "artworkUrl100":"https://is4-ssl.mzstatic.com/image/thumb/Music114/v4/76/7f/68/767f68de-4ed9-e781-e3c3-3bf85a9a7c1c/source/100x100bb.jpg", "releaseDate":"2014-06-20T07:00:00Z", "collectionExplicitness":"notExplicit", "trackExplicitness":"notExplicit", "discCount":1, "discNumber":1, "trackCount":16, "trackNumber":6, "trackTimeMillis":258987, "country":"IDN", "currency":"IDR", "primaryGenreName":"Pop", "isStreamable":true},
//  {"wrapperType":"track", "kind":"song", "artistId":183313439, "collectionId":858518077, "trackId":858518129, "artistName":"Ed Sheeran", "collectionName":"x", "trackName":"Photograph", "collectionCensoredName":"x", "trackCensoredName":"Photograph", "artistViewUrl":"https://music.apple.com/id/artist/ed-sheeran/183313439?uo=4", "collectionViewUrl":"https://music.apple.com/id/album/photograph/858518077?i=858518129&uo=4", "trackViewUrl":"https://music.apple.com/id/album/photograph/858518077?i=858518129&uo=4", "previewUrl":"https://audio-ssl.itunes.apple.com/itunes-assets/Music6/v4/af/d2/ba/afd2ba57-1224-2a21-e359-e4e5a549e499/mzaf_8825681350807096519.plus.aac.p.m4a", "artworkUrl30":"https://is5-ssl.mzstatic.com/image/thumb/Music4/v4/5d/1f/56/5d1f56ae-fa9d-8ae4-724e-172504571be4/source/30x30bb.jpg", "artworkUrl60":"https://is5-ssl.mzstatic.com/image/thumb/Music4/v4/5d/1f/56/5d1f56ae-fa9d-8ae4-724e-172504571be4/source/60x60bb.jpg", "artworkUrl100":"https://is5-ssl.mzstatic.com/image/thumb/Music4/v4/5d/1f/56/5d1f56ae-fa9d-8ae4-724e-172504571be4/source/100x100bb.jpg", "collectionPrice":59000.00, "trackPrice":7000.00, "releaseDate":"2014-06-20T07:00:00Z", "collectionExplicitness":"notExplicit", "trackExplicitness":"notExplicit", "discCount":1, "discNumber":1, "trackCount":12, "trackNumber":6, "trackTimeMillis":258987, "country":"IDN", "currency":"IDR", "primaryGenreName":"Pop", "isStreamable":false},
//  {"wrapperType":"track", "kind":"song", "artistId":183313439, "collectionId":858518077, "trackId":858518134, "artistName":"Ed Sheeran", "collectionName":"x", "trackName":"Thinking Out Loud", "collectionCensoredName":"x", "trackCensoredName":"Thinking Out Loud", "artistViewUrl":"https://music.apple.com/id/artist/ed-sheeran/183313439?uo=4", "collectionViewUrl":"https://music.apple.com/id/album/thinking-out-loud/858518077?i=858518134&uo=4", "trackViewUrl":"https://music.apple.com/id/album/thinking-out-loud/858518077?i=858518134&uo=4", "previewUrl":"https://audio-ssl.itunes.apple.com/itunes-assets/Music/v4/50/e9/f9/50e9f99f-d6e1-c670-c1f1-0e28802d553f/mzaf_3102171608992426034.plus.aac.p.m4a", "artworkUrl30":"https://is5-ssl.mzstatic.com/image/thumb/Music4/v4/5d/1f/56/5d1f56ae-fa9d-8ae4-724e-172504571be4/source/30x30bb.jpg", "artworkUrl60":"https://is5-ssl.mzstatic.com/image/thumb/Music4/v4/5d/1f/56/5d1f56ae-fa9d-8ae4-724e-172504571be4/source/60x60bb.jpg", "artworkUrl100":"https://is5-ssl.mzstatic.com/image/thumb/Music4/v4/5d/1f/56/5d1f56ae-fa9d-8ae4-724e-172504571be4/source/100x100bb.jpg", "collectionPrice":59000.00, "trackPrice":7000.00, "releaseDate":"2014-06-20T07:00:00Z", "collectionExplicitness":"notExplicit", "trackExplicitness":"notExplicit", "discCount":1, "discNumber":1, "trackCount":12, "trackNumber":11, "trackTimeMillis":281560, "country":"IDN", "currency":"IDR", "primaryGenreName":"Pop", "isStreamable":false},
//  {"wrapperType":"track", "kind":"song", "artistId":183313439, "collectionId":855625837, "trackId":855630929, "artistName":"Ed Sheeran", "collectionName":"The Fault In Our Stars (Music From the Motion Picture)", "trackName":"All of the Stars (Soundtrack Version)", "collectionCensoredName":"The Fault In Our Stars (Music From the Motion Picture)", "trackCensoredName":"All of the Stars (Soundtrack Version)", "collectionArtistId":36270, "collectionArtistName":"Various Artists", "artistViewUrl":"https://music.apple.com/id/artist/ed-sheeran/183313439?uo=4", "collectionViewUrl":"https://music.apple.com/id/album/all-of-the-stars-soundtrack-version/855625837?i=855630929&uo=4", "trackViewUrl":"https://music.apple.com/id/album/all-of-the-stars-soundtrack-version/855625837?i=855630929&uo=4", "previewUrl":"https://audio-ssl.itunes.apple.com/itunes-assets/Music/v4/51/cb/f4/51cbf419-e66e-5695-2207-634ae4faea7c/mzaf_552341407168084361.plus.aac.p.m4a", "artworkUrl30":"https://is4-ssl.mzstatic.com/image/thumb/Music124/v4/b6/33/5a/b6335adb-dca5-a6a5-334d-4a78cf50e2e6/source/30x30bb.jpg", "artworkUrl60":"https://is4-ssl.mzstatic.com/image/thumb/Music124/v4/b6/33/5a/b6335adb-dca5-a6a5-334d-4a78cf50e2e6/source/60x60bb.jpg", "artworkUrl100":"https://is4-ssl.mzstatic.com/image/thumb/Music124/v4/b6/33/5a/b6335adb-dca5-a6a5-334d-4a78cf50e2e6/source/100x100bb.jpg", "collectionPrice":59000.00, "trackPrice":7000.00, "releaseDate":"2014-05-19T07:00:00Z", "collectionExplicitness":"notExplicit", "trackExplicitness":"notExplicit", "discCount":1, "discNumber":1, "trackCount":16, "trackNumber":1, "trackTimeMillis":234987, "country":"IDN", "currency":"IDR", "primaryGenreName":"Soundtrack", "isStreamable":true},
//  {"wrapperType":"track", "kind":"song", "artistId":183313439, "collectionId":858512800, "trackId":858517166, "artistName":"Ed Sheeran", "collectionName":"x (Deluxe Edition)", "trackName":"Don't", "collectionCensoredName":"x (Deluxe Edition)", "trackCensoredName":"Don't", "artistViewUrl":"https://music.apple.com/id/artist/ed-sheeran/183313439?uo=4", "collectionViewUrl":"https://music.apple.com/id/album/dont/858512800?i=858517166&uo=4", "trackViewUrl":"https://music.apple.com/id/album/dont/858512800?i=858517166&uo=4", "previewUrl":"https://audio-ssl.itunes.apple.com/itunes-assets/Music/v4/09/03/aa/0903aa48-547e-3a20-5dba-94d931994b1a/mzaf_432550217133590383.plus.aac.p.m4a", "artworkUrl30":"https://is4-ssl.mzstatic.com/image/thumb/Music114/v4/76/7f/68/767f68de-4ed9-e781-e3c3-3bf85a9a7c1c/source/30x30bb.jpg", "artworkUrl60":"https://is4-ssl.mzstatic.com/image/thumb/Music114/v4/76/7f/68/767f68de-4ed9-e781-e3c3-3bf85a9a7c1c/source/60x60bb.jpg", "artworkUrl100":"https://is4-ssl.mzstatic.com/image/thumb/Music114/v4/76/7f/68/767f68de-4ed9-e781-e3c3-3bf85a9a7c1c/source/100x100bb.jpg", "releaseDate":"2014-06-20T07:00:00Z", "collectionExplicitness":"notExplicit", "trackExplicitness":"notExplicit", "discCount":1, "discNumber":1, "trackCount":16, "trackNumber":4, "trackTimeMillis":219840, "country":"IDN", "currency":"IDR", "primaryGenreName":"Pop", "isStreamable":true},
//  {"wrapperType":"track", "kind":"song", "artistId":183313439, "collectionId":1193701079, "trackId":1193701328, "artistName":"Ed Sheeran", "collectionName":"÷ (Deluxe)", "trackName":"Castle on the Hill", "collectionCensoredName":"÷ (Deluxe)", "trackCensoredName":"Castle on the Hill", "artistViewUrl":"https://music.apple.com/id/artist/ed-sheeran/183313439?uo=4", "collectionViewUrl":"https://music.apple.com/id/album/castle-on-the-hill/1193701079?i=1193701328&uo=4", "trackViewUrl":"https://music.apple.com/id/album/castle-on-the-hill/1193701079?i=1193701328&uo=4",
//  "previewUrl":"https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview122/v4/7b/26/95/7b2695b5-f18e-4e7a-c42f-f111fdce6561/mzaf_8097258373583484123.plus.aac.p.m4a", "artworkUrl30":"https://is4-ssl.mzstatic.com/image/thumb/Music124/v4/79/4e/6d/794e6d41-8213-c34c-9eff-3893e0475fe0/source/30x30bb.jpg", "artworkUrl60":"https://is4-ssl.mzstatic.com/image/thumb/Music124/v4/79/4e/6d/794e6d41-8213-c34c-9eff-3893e0475fe0/source/60x60bb.jpg", "artworkUrl100":"https://is4-ssl.mzstatic.com/image/thumb/Music124/v4/79/4e/6d/794e6d41-8213-c34c-9eff-3893e0475fe0/source/100x100bb.jpg", "collectionPrice":85000.00, "trackPrice":7000.00, "releaseDate":"2017-01-06T08:00:00Z", "collectionExplicitness":"notExplicit", "trackExplicitness":"notExplicit", "discCount":1, "discNumber":1, "trackCount":16, "trackNumber":2, "trackTimeMillis":261154, "country":"IDN", "currency":"IDR", "primaryGenreName":"Pop", "isStreamable":true},
//  {"wrapperType":"track", "kind":"song", "artistId":183313439, "collectionId":858512800, "trackId":858517165, "artistName":"Ed Sheeran", "collectionName":"x (Deluxe Edition)", "trackName":"Sing", "collectionCensoredName":"x (Deluxe Edition)", "trackCensoredName":"Sing", "artistViewUrl":"https://music.apple.com/id/artist/ed-sheeran/183313439?uo=4", "collectionViewUrl":"https://music.apple.com/id/album/sing/858512800?i=858517165&uo=4", "trackViewUrl":"https://music.apple.com/id/album/sing/858512800?i=858517165&uo=4", "previewUrl":"https://audio-ssl.itunes.apple.com/itunes-assets/Music4/v4/2d/59/7c/2d597c21-0760-14ec-b17d-79d0b7498273/mzaf_7002599748677951099.plus.aac.p.m4a", "artworkUrl30":"https://is4-ssl.mzstatic.com/image/thumb/Music114/v4/76/7f/68/767f68de-4ed9-e781-e3c3-3bf85a9a7c1c/source/30x30bb.jpg", "artworkUrl60":"https://is4-ssl.mzstatic.com/image/thumb/Music114/v4/76/7f/68/767f68de-4ed9-e781-e3c3-3bf85a9a7c1c/source/60x60bb.jpg", "artworkUrl100":"https://is4-ssl.mzstatic.com/image/thumb/Music114/v4/76/7f/68/767f68de-4ed9-e781-e3c3-3bf85a9a7c1c/source/100x100bb.jpg", "releaseDate":"2014-04-07T07:00:00Z", "collectionExplicitness":"notExplicit", "trackExplicitness":"notExplicit", "discCount":1, "discNumber":1, "trackCount":16, "trackNumber":3, "trackTimeMillis":235382, "country":"IDN", "currency":"IDR", "primaryGenreName":"Pop", "isStreamable":true}]
//  }

export default function MusicListScreen({navigation}) {
  const [musicList, setMusicLists] = useState([]);
  const [searchedValue, setSearchedValue] = useState('');
  const isDarkMode = useColorScheme() === 'dark';
  const [loading, setLoading] = useState(true);

  const {playMusic, currentTrackId} = useMusicPlayer();

  const searchMusic = () => {
    console.log('searching music using term,', searchedValue);
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
      .finally(() => {
        // setLoading(false);
      });
  };

  const playChosenMusic = trackNo => {
    playMusic(musicList, trackNo);
  };

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <Appbar>
        <TextInput
          placeholder="Search..."
          placeholderTextColor="white"
          style={styles.textfield}
          onChangeText={setSearchedValue}
          value={searchedValue}
          onBlur={searchMusic}
        />
      </Appbar>
      <Button
        title="Go to Favorites"
        onPress={() =>
          console.log('click') || navigation.navigate(FAVORITES_SCREEN)
        }
      />
      <ActivityIndicator
        animating={loading}
        size="large"
        color="#00ff00"
        style={[styles.loader, !loading && styles.hidden]}
      />
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <FlatList
        data={musicList}
        renderItem={musicProps => (
          <MusicItemList
            {...musicProps}
            playMusic={playChosenMusic}
            isPlaying={musicProps.item?.trackId === currentTrackId}
          />
        )}
        keyExtractor={({trackId}) => trackId}
      />
    </SafeAreaView>
  );
}

MusicListScreen.propTypes = {
  navigation: object.isRequired,
};
