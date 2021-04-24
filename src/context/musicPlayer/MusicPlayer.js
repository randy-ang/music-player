import React, {useState} from 'react';
import {View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Audio} from 'expo-av';
import SystemSetting from 'react-native-system-setting';
import {useEffect} from 'react';
import {MusicPlayerStyles} from './styles';
import Slider from '@react-native-community/slider';
import {useSnackbar} from '../snackbar';

export default function MusicPlayer({display, onPrev, onNext, musicInfo}) {
  const [music, setMusic] = useState();
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState();
  const {showSnackbar} = useSnackbar();

  const {previewUrl: audioUrl, trackName, artistName} = musicInfo;

  useEffect(() => {
    // no need to show snackbar, because it is not a blocker for user
    SystemSetting.getVolume()
      .then(setVolume)
      .catch(err => {
        console.error('failed to get volume at start: ', err);
      });

    const volumeListener = SystemSetting.addVolumeListener(({value}) => {
      setVolume(value);
    });
    return () => SystemSetting.removeVolumeListener(volumeListener);
  }, []);

  const updateVolume = newVolume => {
    setVolume(newVolume);
    SystemSetting.setVolume(newVolume);
  };

  useEffect(() => {
    if (audioUrl) {
      Audio.Sound.createAsync({uri: audioUrl})
        .then(({sound}) => setMusic(sound))
        .catch(err => {
          showSnackbar('failed to generate preview: ' + err.message);
          console.error('failed to generate preview:', err);
        });
    }
  }, [audioUrl, showSnackbar]);

  const handlePlayPause = async () => {
    if (music) {
      const action = isPlaying ? 'pausing' : 'playing';
      try {
        if (isPlaying) {
          await music.pauseAsync();
        } else {
          await music.playAsync();
        }
        setIsPlaying(playingState => !playingState);
      } catch (err) {
        showSnackbar(`error ${action}: ` + err.message);
        console.error('error playing/pausing', err);
      }
    }
  };

  useEffect(() => {
    if (music) {
      setIsPlaying(true);
      music.playAsync();
      music.setOnPlaybackStatusUpdate(playbackStatus => {
        if (playbackStatus.didJustFinish && !playbackStatus.isLooping) {
          setIsPlaying(false);
          music.playFromPositionAsync(0);
          music.pauseAsync();
          // onNext();
          // The player has just finished playing and will stop. Maybe you want to play something else?
        }
      });

      return () => music.unloadAsync();
    }
  }, [music, onNext]);

  return (
    <View
      style={[
        MusicPlayerStyles.container,
        // don't pause when hide
        !(display && audioUrl) && MusicPlayerStyles.hidden,
      ]}>
      <View style={MusicPlayerStyles.songInfo}>
        <Text>{trackName}</Text>
        <Text>{artistName}</Text>
      </View>
      <View style={MusicPlayerStyles.controls}>
        <Icon
          testID="prevBtn"
          style={MusicPlayerStyles.control}
          name="backward"
          backgroundColor="#3b5998"
          onPress={onPrev}
          size={24}
        />
        <Icon
          testID="pausePlayBtn"
          style={MusicPlayerStyles.control}
          name={isPlaying ? 'pause' : 'play'}
          backgroundColor="#3b5998"
          onPress={handlePlayPause}
          size={24}
        />
        <Icon
          testID="nextBtn"
          style={MusicPlayerStyles.control}
          name="forward"
          backgroundColor="#3b5998"
          onPress={onNext}
          size={24}
        />
      </View>
      <Slider
        style={MusicPlayerStyles.controls}
        minimumValue={0}
        maximumValue={1}
        minimumTrackTintColor="#000000"
        maximumTrackTintColor="#000000"
        onValueChange={updateVolume}
        value={volume}
      />
    </View>
  );
}
