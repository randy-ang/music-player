import React, {useState} from 'react';
import {View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Audio} from 'expo-av';

import {useEffect} from 'react';
import {MusicPlayerStyles} from './styles';

export default function MusicPlayer({display, onPrev, onNext, musicInfo}) {
  const [music, setMusic] = useState();
  const [isPlaying, setIsPlaying] = useState(false);

  const {previewUrl: audioUrl, trackName} = musicInfo;

  useEffect(() => {
    if (audioUrl) {
      Audio.Sound.createAsync({uri: audioUrl})
        .then(({sound}) => setMusic(sound))
        .catch(console.error.bind(console, 'some-error'));
    }
  }, [audioUrl]);

  useEffect(() => {
    if (music) {
      setIsPlaying(true);
      music.playAsync();
      music.setOnPlaybackStatusUpdate(playbackStatus => {
        console.log('playbackStatus', playbackStatus);
        if (playbackStatus.didJustFinish && !playbackStatus.isLooping) {
          console.log('on next');
          onNext();
          // The player has just finished playing and will stop. Maybe you want to play something else?
        }
      });

      return () => music.unloadAsync();
    }
  }, [music, onNext]);

  const handlePlayPause = async () => {
    if (music) {
      try {
        if (isPlaying) {
          await music.pauseAsync();
        } else {
          await music.playAsync();
        }
        setIsPlaying(playingState => !playingState);
      } catch (err) {
        console.error('error playing/pausing', err);
      }
    }
  };

  return (
    <View
      style={[
        MusicPlayerStyles.container,
        // don't pause when hide
        !(display && audioUrl) && MusicPlayerStyles.hidden,
      ]}>
      <View style={MusicPlayerStyles.songInfo}>
        <Text>{trackName}</Text>
      </View>
      <View style={MusicPlayerStyles.controls}>
        <Icon
          style={MusicPlayerStyles.control}
          name="backward"
          backgroundColor="#3b5998"
          onPress={onPrev}
          size={24}
        />
        <Icon
          style={MusicPlayerStyles.control}
          name={isPlaying ? 'pause' : 'play'}
          backgroundColor="#3b5998"
          onPress={handlePlayPause}
          size={24}
        />
        <Icon
          style={MusicPlayerStyles.control}
          name="forward"
          backgroundColor="#3b5998"
          onPress={onNext}
          size={24}
        />
      </View>
    </View>
  );
}
